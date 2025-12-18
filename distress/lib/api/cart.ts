import { FUNCTIONS_URL, getAuthHeaders } from '../supabase';

export interface CartItem {
    id: string;
    user_id: string;
    product_id: string;
    quantity: number;
    created_at: string;
    updated_at: string;
    products?: any;
}

export interface CartResponse {
    items: CartItem[];
    total: number;
    itemCount: number;
}

// Get cart items
export const getCart = async (): Promise<CartResponse> => {
    const response = await fetch(`${FUNCTIONS_URL}/cart`, {
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch cart');
    }

    return response.json();
};

// Add item to cart
export const addToCart = async (product_id: string, quantity: number = 1): Promise<CartItem> => {
    const response = await fetch(`${FUNCTIONS_URL}/cart/add`, {
        method: 'POST',
        headers: await getAuthHeaders(),
        body: JSON.stringify({ product_id, quantity }),
    });

    if (!response.ok) {
        throw new Error('Failed to add item to cart');
    }

    return response.json();
};

// Update cart item quantity
export const updateCartItem = async (id: string, quantity: number): Promise<CartItem> => {
    const response = await fetch(`${FUNCTIONS_URL}/cart/${id}`, {
        method: 'PUT',
        headers: await getAuthHeaders(),
        body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
        throw new Error('Failed to update cart item');
    }

    return response.json();
};

// Remove item from cart
export const removeFromCart = async (id: string): Promise<void> => {
    const response = await fetch(`${FUNCTIONS_URL}/cart/${id}`, {
        method: 'DELETE',
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to remove item from cart');
    }
};
