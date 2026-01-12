import { FUNCTIONS_URL, getAuthHeaders } from '../supabase';

export interface UserProfile {
    id: string;
    full_name: string;
    email: string;
    phone?: string;
    avatar_url?: string;
    role?: string;
    address?: any;
    verification_status?: 'pending' | 'approved' | 'rejected';
    verified_at?: string;
    verified_by?: string;
    rejection_reason?: string;
    business_name?: string;
    business_reg_number?: string;
    nin?: string;
    street_address?: string;
    city?: string;
    state?: string;
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
