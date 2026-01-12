import { FUNCTIONS_URL, getAuthHeaders, supabase } from '../supabase';

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

// Get user profile - Using Supabase client directly for reliability
export const getUserProfile = async (): Promise<UserProfile> => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Not authenticated');
    }

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) {
        console.error('Profile fetch error:', error);
        throw new Error('Failed to fetch user profile');
    }

    if (!data) {
        throw new Error('Profile not found');
    }

    return data as UserProfile;
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
