import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SignUpData {
    email: string;
    password: string;
    full_name?: string;
    phone?: string;
    role?: string;
}

interface SignInData {
    email: string;
    password: string;
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        );

        // Initialize Admin client for database operations (bypassing RLS)
        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
        );

        const url = new URL(req.url);
        const pathParts = url.pathname.split('/').filter(Boolean);
        const action = pathParts[1];

        // POST /auth/signup - Register new user
        if (req.method === 'POST' && action === 'signup') {
            const { email, password, full_name, phone, role }: SignUpData = await req.json();

            // Use regular client for Auth to respect project settings (e.g. email confirmation)
            const { data, error } = await supabaseClient.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name,
                        phone,
                        role,
                    },
                },
            });

            if (error) throw error;

            // Create profile using Admin client (bypassing RLS)
            if (data.user) {
                const { error: profileError } = await supabaseAdmin
                    .from('profiles')
                    .insert([{
                        id: data.user.id,
                        email,
                        full_name,
                        phone,
                        role: role || 'buyer',
                    }]);

                if (profileError) {
                    console.error('Profile creation error:', profileError);
                    // If profile creation fails, we might want to return an error or at least log it
                }
            }

            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 201,
            });
        }

        // POST /auth/signin - Sign in user
        if (req.method === 'POST' && action === 'signin') {
            const { email, password }: SignInData = await req.json();

            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        // POST /auth/signout - Sign out user
        if (req.method === 'POST' && action === 'signout') {
            const { error } = await supabaseClient.auth.signOut();

            if (error) throw error;

            return new Response(JSON.stringify({ message: 'Signed out successfully' }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        // GET /auth/user - Get current user
        if (req.method === 'GET' && action === 'user') {
            const authHeader = req.headers.get('Authorization');
            if (!authHeader) {
                throw new Error('No authorization header');
            }

            const token = authHeader.replace('Bearer ', '');
            const { data, error } = await supabaseClient.auth.getUser(token);

            if (error) throw error;

            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        // POST /auth/reset-password - Request password reset
        if (req.method === 'POST' && action === 'reset-password') {
            const { email } = await req.json();

            const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
                redirectTo: `${req.headers.get('origin')}/reset-password`,
            });

            if (error) throw error;

            return new Response(
                JSON.stringify({ message: 'Password reset email sent' }),
                {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: 200,
                }
            );
        }

        // POST /auth/update-password - Update password
        if (req.method === 'POST' && action === 'update-password') {
            const { password } = await req.json();

            const authHeader = req.headers.get('Authorization');
            if (!authHeader) {
                throw new Error('No authorization header');
            }

            const { data, error } = await supabaseClient.auth.updateUser({
                password,
            });

            if (error) throw error;

            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 405,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        });
    }
});
