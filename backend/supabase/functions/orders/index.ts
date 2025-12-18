import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderItem {
    product_id: string;
    quantity: number;
    price: number;
}

interface Order {
    user_id: string;
    items: OrderItem[];
    total_amount: number;
    shipping_address: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    payment_method: string;
    status?: string;
}

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

        const url = new URL(req.url);
        const pathParts = url.pathname.split('/').filter(Boolean);
        const orderId = pathParts[1];
        const action = pathParts[2];

        // GET /orders - Get all orders for user
        if (req.method === 'GET' && !orderId) {
            const { data: { user } } = await supabaseClient.auth.getUser();

            if (!user) {
                throw new Error('Unauthorized');
            }

            const { data, error } = await supabaseClient
                .from('orders')
                .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        // GET /orders/:id - Get single order
        if (req.method === 'GET' && orderId && !action) {
            const { data: { user } } = await supabaseClient.auth.getUser();

            if (!user) {
                throw new Error('Unauthorized');
            }

            const { data, error } = await supabaseClient
                .from('orders')
                .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
                .eq('id', orderId)
                .eq('user_id', user.id)
                .single();

            if (error) throw error;

            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        // POST /orders - Create new order
        if (req.method === 'POST') {
            const { data: { user } } = await supabaseClient.auth.getUser();

            if (!user) {
                throw new Error('Unauthorized');
            }

            const orderData: Order = await req.json();
            orderData.user_id = user.id;
            orderData.status = 'pending';

            // Create order
            const { data: order, error: orderError } = await supabaseClient
                .from('orders')
                .insert([{
                    user_id: orderData.user_id,
                    total_amount: orderData.total_amount,
                    shipping_address: orderData.shipping_address,
                    payment_method: orderData.payment_method,
                    status: orderData.status,
                }])
                .select()
                .single();

            if (orderError) throw orderError;

            // Create order items
            const orderItems = orderData.items.map(item => ({
                order_id: order.id,
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price,
            }));

            const { error: itemsError } = await supabaseClient
                .from('order_items')
                .insert(orderItems);

            if (itemsError) throw itemsError;

            // Update product stock
            for (const item of orderData.items) {
                const { error: stockError } = await supabaseClient.rpc('decrement_stock', {
                    product_id: item.product_id,
                    quantity: item.quantity,
                });

                if (stockError) throw stockError;
            }

            return new Response(JSON.stringify(order), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 201,
            });
        }

        // PUT /orders/:id/status - Update order status
        if (req.method === 'PUT' && orderId && action === 'status') {
            const { status } = await req.json();

            const { data, error } = await supabaseClient
                .from('orders')
                .update({ status })
                .eq('id', orderId)
                .select()
                .single();

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
