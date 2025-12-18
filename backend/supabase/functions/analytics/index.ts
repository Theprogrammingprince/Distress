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
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
        );

        const url = new URL(req.url);
        const pathParts = url.pathname.split('/').filter(Boolean);
        const endpoint = pathParts[1];

        // GET /analytics/dashboard - Get dashboard statistics
        if (req.method === 'GET' && endpoint === 'dashboard') {
            // Total revenue
            const { data: orders } = await supabaseClient
                .from('orders')
                .select('total_amount, status');

            const totalRevenue = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;
            const completedOrders = orders?.filter(o => o.status === 'completed').length || 0;
            const pendingOrders = orders?.filter(o => o.status === 'pending').length || 0;

            // Total products
            const { count: totalProducts } = await supabaseClient
                .from('products')
                .select('*', { count: 'exact', head: true });

            // Total customers
            const { count: totalCustomers } = await supabaseClient
                .from('profiles')
                .select('*', { count: 'exact', head: true });

            // Low stock products
            const { data: lowStockProducts } = await supabaseClient
                .from('products')
                .select('*')
                .lt('stock', 10);

            // Recent orders
            const { data: recentOrders } = await supabaseClient
                .from('orders')
                .select(`
          *,
          profiles (full_name, email)
        `)
                .order('created_at', { ascending: false })
                .limit(5);

            return new Response(
                JSON.stringify({
                    totalRevenue,
                    totalOrders: orders?.length || 0,
                    completedOrders,
                    pendingOrders,
                    totalProducts: totalProducts || 0,
                    totalCustomers: totalCustomers || 0,
                    lowStockProducts: lowStockProducts || [],
                    recentOrders: recentOrders || [],
                }),
                {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: 200,
                }
            );
        }

        // GET /analytics/sales - Get sales data
        if (req.method === 'GET' && endpoint === 'sales') {
            const period = url.searchParams.get('period') || 'week'; // week, month, year

            let startDate = new Date();
            if (period === 'week') {
                startDate.setDate(startDate.getDate() - 7);
            } else if (period === 'month') {
                startDate.setMonth(startDate.getMonth() - 1);
            } else if (period === 'year') {
                startDate.setFullYear(startDate.getFullYear() - 1);
            }

            const { data: sales, error } = await supabaseClient
                .from('orders')
                .select('created_at, total_amount, status')
                .gte('created_at', startDate.toISOString())
                .order('created_at', { ascending: true });

            if (error) throw error;

            // Group by date
            const salesByDate: { [key: string]: { revenue: number; orders: number } } = {};

            sales?.forEach(sale => {
                const date = new Date(sale.created_at).toISOString().split('T')[0];
                if (!salesByDate[date]) {
                    salesByDate[date] = { revenue: 0, orders: 0 };
                }
                salesByDate[date].revenue += sale.total_amount;
                salesByDate[date].orders += 1;
            });

            const chartData = Object.entries(salesByDate).map(([date, data]) => ({
                date,
                revenue: data.revenue,
                orders: data.orders,
            }));

            return new Response(JSON.stringify(chartData), {
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
