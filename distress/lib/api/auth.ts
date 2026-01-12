import { FUNCTIONS_URL, getAuthHeaders, supabase } from '../supabase';

export interface SignUpData {
    email: string;
    password: string;
    full_name?: string;
    phone?: string;
    role?: string;
    avatar_url?: string;
    // Seller-specific fields
    nin?: string;
    business_name?: string;
    business_reg_number?: string;
    street_address?: string;
    city?: string;
    state?: string;
}

export interface SignInData {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: any;
    session: any;
}

// Sign up
export const signUp = async (data: SignUpData): Promise<AuthResponse> => {
    const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            data: {
                full_name: data.full_name,
                phone: data.phone,
                role: data.role || 'buyer',
                avatar_url: data.avatar_url,
                // Seller-specific fields
                nin: data.nin,
                business_name: data.business_name,
                business_reg_number: data.business_reg_number,
                street_address: data.street_address,
                city: data.city,
                state: data.state,
            },
        },
    });

    if (error) throw error;

    return authData as AuthResponse;
};

// Sign in
export const signIn = async (data: SignInData): Promise<AuthResponse> => {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
    });

    if (error) throw error;

    return authData as AuthResponse;
};

// Sign out
export const signOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
};

// Get current user
export const getCurrentUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) throw error;

    return user;
};

// Get current session
export const getSession = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) throw error;

    return session;
};

// Request password reset
export const resetPassword = async (email: string): Promise<void> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
};

// Update password
export const updatePassword = async (newPassword: string): Promise<void> => {
    const { error } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (error) throw error;
};

// Update user profile
export const updateUserEmail = async (newEmail: string): Promise<void> => {
    const { error } = await supabase.auth.updateUser({
        email: newEmail,
    });

    if (error) throw error;
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
};
