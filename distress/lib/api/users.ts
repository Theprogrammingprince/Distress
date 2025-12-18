import { FUNCTIONS_URL, getAuthHeaders } from '../supabase';

export interface UserProfile {
    id: string;
    full_name: string;
    email: string;
    phone?: string;
    avatar_url?: string;
    address?: any;
    created_at: string;
    updated_at: string;
}

// Get user profile
export const getUserProfile = async (): Promise<UserProfile> => {
    const response = await fetch(`${FUNCTIONS_URL}/users/profile`, {
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user profile');
    }

    return response.json();
};

// Update user profile
export const updateUserProfile = async (updates: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await fetch(`${FUNCTIONS_URL}/users/profile`, {
        method: 'PUT',
        headers: await getAuthHeaders(),
        body: JSON.stringify(updates),
    });

    if (!response.ok) {
        throw new Error('Failed to update user profile');
    }

    return response.json();
};

// Get user order history
export const getUserOrders = async (): Promise<any[]> => {
    const response = await fetch(`${FUNCTIONS_URL}/users/orders`, {
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user orders');
    }

    return response.json();
};
