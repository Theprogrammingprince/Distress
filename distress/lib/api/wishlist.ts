import { FUNCTIONS_URL, getAuthHeaders } from '../supabase';

export interface WishlistItem {
    id: string;
    user_id: string;
    product_id: string;
    created_at: string;
    products?: any;
}

// Get wishlist
export const getWishlist = async (): Promise<WishlistItem[]> => {
    const response = await fetch(`${FUNCTIONS_URL}/wishlist`, {
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch wishlist');
    }

    return response.json();
};

// Add to wishlist
export const addToWishlist = async (product_id: string): Promise<WishlistItem> => {
    const response = await fetch(`${FUNCTIONS_URL}/wishlist`, {
        method: 'POST',
        headers: await getAuthHeaders(),
        body: JSON.stringify({ product_id }),
    });

    if (!response.ok) {
        throw new Error('Failed to add to wishlist');
    }

    return response.json();
};

// Remove from wishlist by ID
export const removeFromWishlist = async (id: string): Promise<void> => {
    const response = await fetch(`${FUNCTIONS_URL}/wishlist/${id}`, {
        method: 'DELETE',
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to remove from wishlist');
    }
};

// Remove from wishlist by product ID
export const removeFromWishlistByProduct = async (product_id: string): Promise<void> => {
    const response = await fetch(`${FUNCTIONS_URL}/wishlist/product/${product_id}`, {
        method: 'DELETE',
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to remove from wishlist');
    }
};
