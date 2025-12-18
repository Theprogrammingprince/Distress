import { FUNCTIONS_URL, getAuthHeaders } from '../supabase';

export interface OrderItem {
    product_id: string;
    quantity: number;
    price: number;
}

export interface ShippingAddress {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export interface Order {
    id: string;
    user_id: string;
    total_amount: number;
    shipping_address: ShippingAddress;
    payment_method: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    created_at: string;
    updated_at: string;
    order_items?: any[];
}

export interface CreateOrderData {
    items: OrderItem[];
    total_amount: number;
    shipping_address: ShippingAddress;
    payment_method: string;
}

// Get all orders for user
export const getOrders = async (): Promise<Order[]> => {
    const response = await fetch(`${FUNCTIONS_URL}/orders`, {
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }

    return response.json();
};

// Get single order
export const getOrder = async (id: string): Promise<Order> => {
    const response = await fetch(`${FUNCTIONS_URL}/orders/${id}`, {
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch order');
    }

    return response.json();
};

// Create order
export const createOrder = async (orderData: CreateOrderData): Promise<Order> => {
    const response = await fetch(`${FUNCTIONS_URL}/orders`, {
        method: 'POST',
        headers: await getAuthHeaders(),
        body: JSON.stringify(orderData),
    });

    if (!response.ok) {
        throw new Error('Failed to create order');
    }

    return response.json();
};

// Update order status
export const updateOrderStatus = async (id: string, status: Order['status']): Promise<Order> => {
    const response = await fetch(`${FUNCTIONS_URL}/orders/${id}/status`, {
        method: 'PUT',
        headers: await getAuthHeaders(),
        body: JSON.stringify({ status }),
    });

    if (!response.ok) {
        throw new Error('Failed to update order status');
    }

    return response.json();
};
