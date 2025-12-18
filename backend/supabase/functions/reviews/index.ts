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
        const reviewId = pathParts[1];

        // GET /reviews/product/:product_id - Get reviews for a product
        if (req.method === 'GET' && pathParts[0] === 'product' && pathParts[1]) {
            const productId = pathParts[1];

            const { data, error } = await supabaseClient
                .from('reviews')
                .select(`
          *,
          profiles (full_name, avatar_url)
        `)
                .eq('product_id', productId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Calculate average rating
            const avgRating = data.length > 0
                ? data.reduce((sum, review) => sum + review.rating, 0) / data.length
                : 0;

            return new Response(
                JSON.stringify({
                    reviews: data,
                    average_rating: avgRating,
                    total_reviews: data.length,
                }),
                {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: 200,
                }
            );
        }

        // POST /reviews - Create a review
        if (req.method === 'POST') {
            const { product_id, rating, comment } = await req.json();

            // Check if user already reviewed this product
            const { data: existing } = await supabaseClient
                .from('reviews')
                .select('*')
                .eq('user_id', user.id)
                .eq('product_id', product_id)
                .single();

            if (existing) {
                throw new Error('You have already reviewed this product');
            }

            const { data, error } = await supabaseClient
                .from('reviews')
                .insert([{
                    user_id: user.id,
                    product_id,
                    rating,
                    comment,
                }])
                .select()
                .single();

            if (error) throw error;

            // Update product rating
            await supabaseClient.rpc('update_product_rating', { product_id });

            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 201,
            });
        }

        // PUT /reviews/:id - Update a review
        if (req.method === 'PUT' && reviewId) {
            const { rating, comment } = await req.json();

            const { data, error } = await supabaseClient
                .from('reviews')
                .update({ rating, comment })
                .eq('id', reviewId)
                .eq('user_id', user.id)
                .select()
                .single();

            if (error) throw error;

            // Update product rating
            const { data: review } = await supabaseClient
                .from('reviews')
                .select('product_id')
                .eq('id', reviewId)
                .single();

            if (review) {
                await supabaseClient.rpc('update_product_rating', { product_id: review.product_id });
            }

            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        // DELETE /reviews/:id - Delete a review
        if (req.method === 'DELETE' && reviewId) {
            // Get product_id before deleting
            const { data: review } = await supabaseClient
                .from('reviews')
                .select('product_id')
                .eq('id', reviewId)
                .eq('user_id', user.id)
                .single();

            const { error } = await supabaseClient
                .from('reviews')
                .delete()
                .eq('id', reviewId)
                .eq('user_id', user.id);

            if (error) throw error;

            // Update product rating
            if (review) {
                await supabaseClient.rpc('update_product_rating', { product_id: review.product_id });
            }

            return new Response(JSON.stringify({ message: 'Review deleted' }), {
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
