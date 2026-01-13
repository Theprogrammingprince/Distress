import { supabase } from '../supabase';

export interface Notification {
    id: string;
    user_id: string;
    type: 'seller_approved' | 'seller_rejected' | 'order_update' | 'system';
    title: string;
    message: string;
    data: {
        rejection_reason?: string;
        rejected_at?: string;
        verified_at?: string;
        submitted_at?: string;
        product_id?: string;
        order_id?: string;
    };
    read: boolean;
    created_at: string;
    updated_at: string;
}

// Get all notifications for current user
export const getNotifications = async (): Promise<Notification[]> => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Not authenticated');
    }

    const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Get notifications error:', error);
        throw new Error('Failed to fetch notifications');
    }

    return data as Notification[];
};

// Get unread notification count
export const getUnreadCount = async (): Promise<number> => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return 0;
    }

    const { count, error } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('read', false);

    if (error) {
        console.error('Get unread count error:', error);
        return 0;
    }

    return count || 0;
};

// Mark single notification as read
export const markAsRead = async (notificationId: string): Promise<boolean> => {
    const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

    if (error) {
        console.error('Mark as read error:', error);
        return false;
    }

    return true;
};

// Mark all notifications as read
export const markAllAsRead = async (): Promise<number> => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return 0;
    }

    const { data, error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id)
        .eq('read', false)
        .select();

    if (error) {
        console.error('Mark all as read error:', error);
        return 0;
    }

    return data?.length || 0;
};

// Delete a notification
export const deleteNotification = async (notificationId: string): Promise<boolean> => {
    const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);

    if (error) {
        console.error('Delete notification error:', error);
        return false;
    }

    return true;
};
