import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

        // Verify admin user
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (!user) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 401,
            });
        }

        // Check if user is super admin
        const { data: profile } = await supabaseClient
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (!profile || profile.role !== 'super_admin') {
            return new Response(JSON.stringify({ error: 'Forbidden: Admin access required' }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 403,
            });
        }

        const url = new URL(req.url);
        const pathParts = url.pathname.split('/').filter(Boolean);
        const action = pathParts[1]; // 'pending', 'approve', 'reject', 'stats'

        // GET /admin/pending - Get all pending products
        if (req.method === 'GET' && action === 'pending') {
            const page = parseInt(url.searchParams.get('page') || '1');
            const limit = parseInt(url.searchParams.get('limit') || '20');
            const offset = (page - 1) * limit;

            const { data, error, count } = await supabaseClient
                .from('products')
                .select(`
                    *,
                    seller:profiles!products_seller_id_fkey(
                        id,
                        full_name,
                        email
                    )
                `, { count: 'exact' })
                .eq('verification_status', 'pending')
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

        // GET /admin/all - Get all products with filter by status
        if (req.method === 'GET' && action === 'all') {
            const status = url.searchParams.get('status'); // 'pending', 'approved', 'rejected', or null for all
            const page = parseInt(url.searchParams.get('page') || '1');
            const limit = parseInt(url.searchParams.get('limit') || '20');
            const offset = (page - 1) * limit;

            let query = supabaseClient
                .from('products')
                .select(`
                    *,
                    seller:profiles!products_seller_id_fkey(
                        id,
                        full_name,
                        email
                    )
                `, { count: 'exact' });

            if (status) {
                query = query.eq('verification_status', status);
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

        // GET /admin/stats - Get verification statistics
        if (req.method === 'GET' && action === 'stats') {
            const { data, error } = await supabaseClient
                .from('product_verification_stats')
                .select('*')
                .single();

            if (error) throw error;

            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        // POST /admin/approve - Approve a product
        if (req.method === 'POST' && action === 'approve') {
            const { product_id } = await req.json();

            if (!product_id) {
                return new Response(JSON.stringify({ error: 'product_id is required' }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: 400,
                });
            }

            const { error } = await supabaseClient.rpc('approve_product', {
                product_id,
                admin_id: user.id,
            });

            if (error) throw error;

            // Get updated product
            const { data: product } = await supabaseClient
                .from('products')
                .select('*')
                .eq('id', product_id)
                .single();

            return new Response(
                JSON.stringify({
                    message: 'Product approved successfully',
                    product
                }),
                {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: 200,
                }
            );
        }

        // POST /admin/reject - Reject a product
        if (req.method === 'POST' && action === 'reject') {
            const { product_id, reason } = await req.json();

            if (!product_id || !reason) {
                return new Response(JSON.stringify({ error: 'product_id and reason are required' }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: 400,
                });
            }

            const { error } = await supabaseClient.rpc('reject_product', {
                product_id,
                admin_id: user.id,
                reason,
            });

            if (error) throw error;

            // Get updated product
            const { data: product } = await supabaseClient
                .from('products')
                .select('*')
                .eq('id', product_id)
                .single();

            return new Response(
                JSON.stringify({
                    message: 'Product rejected successfully',
                    product
                }),
                {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: 200,
                }
            );
        }

        // GET /admin/product/:id - Get single product details for review
        if (req.method === 'GET' && pathParts[1] === 'product') {
            const productId = pathParts[2];

            const { data, error } = await supabaseClient
                .from('products')
                .select(`
                    *,
                    seller:profiles!products_seller_id_fkey(
                        id,
                        full_name,
                        email,
                        phone
                    ),
                    verifier:profiles!products_verified_by_fkey(
                        id,
                        full_name,
                        email
                    )
                `)
                .eq('id', productId)
                .single();

            if (error) throw error;

            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        // ============================================
        // SELLER/CLIENT VERIFICATION ENDPOINTS
        // ============================================

        // GET /admin/sellers/pending - Get all pending sellers/clients
        if (req.method === 'GET' && pathParts[1] === 'sellers' && pathParts[2] === 'pending') {
            const page = parseInt(url.searchParams.get('page') || '1');
            const limit = parseInt(url.searchParams.get('limit') || '20');
            const offset = (page - 1) * limit;

            const { data, error, count } = await supabaseClient
                .from('profiles')
                .select('*', { count: 'exact' })
                .in('role', ['client', 'seller'])
                .eq('verification_status', 'pending')
                .range(offset, offset + limit - 1)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return new Response(
                JSON.stringify({
                    sellers: data,
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

        // GET /admin/sellers/all - Get all sellers with optional status filter
        if (req.method === 'GET' && pathParts[1] === 'sellers' && pathParts[2] === 'all') {
            const status = url.searchParams.get('status'); // 'pending', 'approved', 'rejected'
            const page = parseInt(url.searchParams.get('page') || '1');
            const limit = parseInt(url.searchParams.get('limit') || '20');
            const offset = (page - 1) * limit;

            let query = supabaseClient
                .from('profiles')
                .select('*', { count: 'exact' })
                .in('role', ['client', 'seller']);

            if (status) {
                query = query.eq('verification_status', status);
            }

            const { data, error, count } = await query
                .range(offset, offset + limit - 1)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return new Response(
                JSON.stringify({
                    sellers: data,
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

        // GET /admin/sellers/stats - Get seller verification statistics
        if (req.method === 'GET' && pathParts[1] === 'sellers' && pathParts[2] === 'stats') {
            const { data, error } = await supabaseClient
                .from('seller_verification_stats')
                .select('*')
                .single();

            if (error) throw error;

            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        // GET /admin/sellers/:id - Get single seller details for review
        if (req.method === 'GET' && pathParts[1] === 'sellers' && pathParts[2] && pathParts[2] !== 'pending' && pathParts[2] !== 'all' && pathParts[2] !== 'stats') {
            const sellerId = pathParts[2];

            const { data, error } = await supabaseClient
                .from('profiles')
                .select(`
                    *,
                    verifier:profiles!profiles_verified_by_fkey(
                        id,
                        full_name,
                        email
                    )
                `)
                .eq('id', sellerId)
                .single();

            if (error) throw error;

            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        // POST /admin/sellers/approve - Approve a seller/client
        if (req.method === 'POST' && pathParts[1] === 'sellers' && pathParts[2] === 'approve') {
            const { seller_id } = await req.json();

            if (!seller_id) {
                return new Response(JSON.stringify({ error: 'seller_id is required' }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: 400,
                });
            }

            const { error } = await supabaseClient.rpc('approve_seller', {
                seller_id,
                admin_id: user.id,
            });

            if (error) throw error;

            // Get updated seller
            const { data: seller } = await supabaseClient
                .from('profiles')
                .select('*')
                .eq('id', seller_id)
                .single();

            return new Response(
                JSON.stringify({
                    message: 'Seller approved successfully',
                    seller
                }),
                {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: 200,
                }
            );
        }

        // POST /admin/sellers/reject - Reject a seller/client
        if (req.method === 'POST' && pathParts[1] === 'sellers' && pathParts[2] === 'reject') {
            const { seller_id, reason } = await req.json();

            if (!seller_id || !reason) {
                return new Response(JSON.stringify({ error: 'seller_id and reason are required' }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: 400,
                });
            }

            const { error } = await supabaseClient.rpc('reject_seller', {
                seller_id,
                admin_id: user.id,
                reason,
            });

            if (error) throw error;

            // Get updated seller
            const { data: seller } = await supabaseClient
                .from('profiles')
                .select('*')
                .eq('id', seller_id)
                .single();

            return new Response(
                JSON.stringify({
                    message: 'Seller rejected successfully',
                    seller
                }),
                {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: 200,
                }
            );
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
