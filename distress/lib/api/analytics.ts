import { FUNCTIONS_URL, getAuthHeaders } from '../supabase';

export interface DashboardStats {
    totalRevenue: number;
    totalOrders: number;
    completedOrders: number;
    pendingOrders: number;
    totalProducts: number;
    totalCustomers: number;
    lowStockProducts: any[];
    recentOrders: any[];
}

export interface SalesData {
    date: string;
    revenue: number;
    orders: number;
}

// Get dashboard statistics
export const getDashboardStats = async (): Promise<DashboardStats> => {
    const response = await fetch(`${FUNCTIONS_URL}/analytics/dashboard`, {
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
    }

    return response.json();
};

// Get sales data
export const getSalesData = async (period: 'week' | 'month' | 'year' = 'week'): Promise<SalesData[]> => {
    const response = await fetch(`${FUNCTIONS_URL}/analytics/sales?period=${period}`, {
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch sales data');
    }

    return response.json();
};
