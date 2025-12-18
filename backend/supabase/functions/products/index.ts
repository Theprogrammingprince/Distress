import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Product {
    name: string;
    description: string;
    price: number;
    category: string;
    image_url: string;
    stock: number;
    rating?: number;
    badge?: string;
}

serve(async (req) => {
    // Handle CORS preflight requests
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
        const productId = pathParts[1];

        // GET /products - Get all products with filters
        if (req.method === 'GET' && !productId) {
            const category = url.searchParams.get('category');
            const minPrice = url.searchParams.get('minPrice');
            const maxPrice = url.searchParams.get('maxPrice');
            const search = url.searchParams.get('search');
            const page = parseInt(url.searchParams.get('page') || '1');
            const limit = parseInt(url.searchParams.get('limit') || '12');
            const offset = (page - 1) * limit;

            let query = supabaseClient
                .from('products')
                .select('*', { count: 'exact' });

            if (category) {
                query = query.eq('category', category);
            }

            if (minPrice) {
                query = query.gte('price', parseFloat(minPrice));
            }

            if (maxPrice) {
                query = query.lte('price', parseFloat(maxPrice));
            }

            if (search) {
                query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
            }

            const { data, error, count } = await query
                .range(offset, offset + limit - 1)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return new Response(
                JSON.stringify({
                    products: data,
                    total: count,
                    page,
                    totalPages: Math.ceil((count || 0) / limit),
                }),
                {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: 200,
                }
            );
        }

        // GET /products/:id - Get single product
        if (req.method === 'GET' && productId) {
            const { data, error } = await supabaseClient
                .from('products')
                .select('*')
                .eq('id', productId)
                .single();

            if (error) throw error;

            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        // POST /products - Create new product
        if (req.method === 'POST') {
            const product: Product = await req.json();

            const { data, error } = await supabaseClient
                .from('products')
                .insert([product])
                .select()
                .single();

            if (error) throw error;

            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 201,
            });
        }

        // PUT /products/:id - Update product
        if (req.method === 'PUT' && productId) {
            const updates: Partial<Product> = await req.json();

            const { data, error } = await supabaseClient
                .from('products')
                .update(updates)
                .eq('id', productId)
                .select()
                .single();

            if (error) throw error;

            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        // DELETE /products/:id - Delete product
        if (req.method === 'DELETE' && productId) {
            const { error } = await supabaseClient
                .from('products')
                .delete()
                .eq('id', productId);

            if (error) throw error;

            return new Response(JSON.stringify({ message: 'Product deleted successfully' }), {
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
