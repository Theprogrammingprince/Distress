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
        const cartItemId = pathParts[1];

        // GET /cart - Get all cart items
        if (req.method === 'GET') {
            const { data, error } = await supabaseClient
                .from('cart_items')
                .select(`
          *,
          products (*)
        `)
                .eq('user_id', user.id);

            if (error) throw error;

            const total = data.reduce((sum, item) => sum + (item.products.price * item.quantity), 0);

            return new Response(
                JSON.stringify({
                    items: data,
                    total,
                    itemCount: data.reduce((sum, item) => sum + item.quantity, 0),
                }),
                {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: 200,
                }
            );
        }

        // POST /cart/add - Add item to cart
        if (req.method === 'POST') {
            const { product_id, quantity } = await req.json();

            // Check if item already exists in cart
            const { data: existing } = await supabaseClient
                .from('cart_items')
                .select('*')
                .eq('user_id', user.id)
                .eq('product_id', product_id)
                .single();

            if (existing) {
                // Update quantity
                const { data, error } = await supabaseClient
                    .from('cart_items')
                    .update({ quantity: existing.quantity + quantity })
                    .eq('id', existing.id)
                    .select()
                    .single();

                if (error) throw error;

                return new Response(JSON.stringify(data), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: 200,
                });
            } else {
                // Create new cart item
                const { data, error } = await supabaseClient
                    .from('cart_items')
                    .insert([{ user_id: user.id, product_id, quantity }])
                    .select()
                    .single();

                if (error) throw error;

                return new Response(JSON.stringify(data), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: 201,
                });
            }
        }

        // PUT /cart/:id - Update cart item quantity
        if (req.method === 'PUT' && cartItemId) {
            const { quantity } = await req.json();

            const { data, error } = await supabaseClient
                .from('cart_items')
                .update({ quantity })
                .eq('id', cartItemId)
                .eq('user_id', user.id)
                .select()
                .single();

            if (error) throw error;

            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        // DELETE /cart/:id - Remove item from cart
        if (req.method === 'DELETE' && cartItemId) {
            const { error } = await supabaseClient
                .from('cart_items')
                .delete()
                .eq('id', cartItemId)
                .eq('user_id', user.id);

            if (error) throw error;

            return new Response(JSON.stringify({ message: 'Item removed from cart' }), {
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
