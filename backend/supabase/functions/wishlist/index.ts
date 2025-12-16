import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            {
                global: {
                    headers: { Authorization: req.headers.get('Authorization')! },
                },
            }
        );

        const { data: { user } } = await supabaseClient.auth.getUser();

        if (!user) {
            throw new Error('Unauthorized');
        }

        const url = new URL(req.url);
        const pathParts = url.pathname.split('/').filter(Boolean);
        const itemId = pathParts[1];

        // GET /wishlist - Get all wishlist items
        if (req.method === 'GET' && !itemId) {
            const { data, error } = await supabaseClient
                .from('wishlist')
                .select(`
          *,
          products (*)
        `)
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        // POST /wishlist - Add item to wishlist
        if (req.method === 'POST') {
            const { product_id } = await req.json();

            // Check if already in wishlist
            const { data: existing } = await supabaseClient
                .from('wishlist')
                .select('*')
                .eq('user_id', user.id)
                .eq('product_id', product_id)
                .single();

            if (existing) {
                return new Response(
                    JSON.stringify({ message: 'Product already in wishlist', data: existing }),
                    {
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                        status: 200,
                    }
                );
            }

            const { data, error } = await supabaseClient
                .from('wishlist')
                .insert([{ user_id: user.id, product_id }])
                .select()
                .single();

            if (error) throw error;

            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 201,
            });
        }

        // DELETE /wishlist/:id - Remove item from wishlist
        if (req.method === 'DELETE' && itemId) {
            const { error } = await supabaseClient
                .from('wishlist')
                .delete()
                .eq('id', itemId)
                .eq('user_id', user.id);

            if (error) throw error;

            return new Response(JSON.stringify({ message: 'Item removed from wishlist' }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        // DELETE /wishlist/product/:product_id - Remove by product ID
        if (req.method === 'DELETE' && pathParts[0] === 'product' && pathParts[1]) {
            const productId = pathParts[1];

            const { error } = await supabaseClient
                .from('wishlist')
                .delete()
                .eq('product_id', productId)
                .eq('user_id', user.id);

            if (error) throw error;

            return new Response(JSON.stringify({ message: 'Item removed from wishlist' }), {
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
