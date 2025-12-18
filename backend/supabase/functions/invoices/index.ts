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

        const url = new URL(req.url);
        const pathParts = url.pathname.split('/').filter(Boolean);
        const invoiceId = pathParts[1];

        // GET /invoices - Get all invoices
        if (req.method === 'GET' && !invoiceId) {
            const { data, error } = await supabaseClient
                .from('invoices')
                .select(`
          *,
          orders (
            *,
            order_items (
              *,
              products (*)
            )
          )
        `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        // GET /invoices/:id - Get single invoice
        if (req.method === 'GET' && invoiceId) {
            const { data, error } = await supabaseClient
                .from('invoices')
                .select(`
          *,
          orders (
            *,
            order_items (
              *,
              products (*)
            )
          )
        `)
                .eq('id', invoiceId)
                .single();

            if (error) throw error;

            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        // POST /invoices - Create invoice
        if (req.method === 'POST') {
            const { order_id, customer_info } = await req.json();

            // Get order details
            const { data: order, error: orderError } = await supabaseClient
                .from('orders')
                .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
                .eq('id', order_id)
                .single();

            if (orderError) throw orderError;

            // Generate invoice number
            const invoiceNumber = `INV-${Date.now()}`;

            const { data, error } = await supabaseClient
                .from('invoices')
                .insert([{
                    invoice_number: invoiceNumber,
                    order_id,
                    customer_info,
                    amount: order.total_amount,
                    status: 'pending',
                }])
                .select()
                .single();

            if (error) throw error;

            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 201,
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
