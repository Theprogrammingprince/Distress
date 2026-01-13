'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Bell, CheckCircle, XCircle, Clock, AlertTriangle,
    Package, ShoppingCart, Info, Check, CheckCheck, Trash2,
    RefreshCw
} from 'lucide-react';
import {
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    Notification
} from '@/lib/api/notifications';
import toast from 'react-hot-toast';

export default function NotificationsPage() {
    const queryClient = useQueryClient();
    const [filter, setFilter] = useState<'all' | 'unread'>('all');

    const { data: notifications = [], isLoading, refetch } = useQuery({
        queryKey: ['notifications'],
        queryFn: getNotifications,
    });

    const markReadMutation = useMutation({
        mutationFn: markAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
        }
    });

    const markAllReadMutation = useMutation({
        mutationFn: markAllAsRead,
        onSuccess: (count) => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
            if (count > 0) {
                toast.success(`Marked ${count} notifications as read`);
            }
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteNotification,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
            toast.success('Notification deleted');
        }
    });

    const filteredNotifications = filter === 'unread'
        ? notifications.filter(n => !n.read)
        : notifications;

    const unreadCount = notifications.filter(n => !n.read).length;

    const getNotificationIcon = (type: Notification['type']) => {
        switch (type) {
            case 'seller_approved':
                return <CheckCircle className="w-6 h-6 text-green-500" />;
            case 'seller_rejected':
                return <XCircle className="w-6 h-6 text-red-500" />;
            case 'order_update':
                return <ShoppingCart className="w-6 h-6 text-blue-500" />;
            default:
                return <Info className="w-6 h-6 text-gray-500" />;
        }
    };

    const getNotificationBg = (type: Notification['type'], isRead: boolean) => {
        if (isRead) return 'bg-white dark:bg-gray-800';

        switch (type) {
            case 'seller_approved':
                return 'bg-green-50 dark:bg-green-900/20';
            case 'seller_rejected':
                return 'bg-red-50 dark:bg-red-900/20';
            case 'order_update':
                return 'bg-blue-50 dark:bg-blue-900/20';
            default:
                return 'bg-gray-50 dark:bg-gray-700';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        Notifications
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Stay updated with your account activity
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => refetch()}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="Refresh"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                    {unreadCount > 0 && (
                        <button
                            onClick={() => markAllReadMutation.mutate()}
                            disabled={markAllReadMutation.isPending}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 hover:bg-teal-100 dark:hover:bg-teal-900/40 rounded-lg transition-colors"
                        >
                            <CheckCheck className="w-4 h-4" />
                            Mark all as read
                        </button>
                    )}
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 mb-6">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${filter === 'all'
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                >
                    All ({notifications.length})
                </button>
                <button
                    onClick={() => setFilter('unread')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${filter === 'unread'
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                >
                    Unread
                    {unreadCount > 0 && (
                        <span className={`px-2 py-0.5 text-xs rounded-full ${filter === 'unread'
                                ? 'bg-white/20 text-white'
                                : 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300'
                            }`}>
                            {unreadCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Notifications List */}
            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
                                <div className="flex-1 space-y-3">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredNotifications.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <Bell className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        {filter === 'unread'
                            ? 'You\'re all caught up!'
                            : 'When you receive notifications, they will appear here.'}
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredNotifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`${getNotificationBg(notification.type, notification.read)} rounded-xl border border-gray-200 dark:border-gray-700 p-5 transition-all hover:shadow-md`}
                        >
                            <div className="flex gap-4">
                                {/* Icon */}
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 flex items-center justify-center shadow-sm">
                                        {getNotificationIcon(notification.type)}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className={`font-semibold ${notification.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
                                                {notification.title}
                                            </h3>
                                            <p className={`mt-1 text-sm ${notification.read ? 'text-gray-500 dark:text-gray-500' : 'text-gray-600 dark:text-gray-400'}`}>
                                                {notification.message}
                                            </p>

                                            {/* Rejection Reason */}
                                            {notification.type === 'seller_rejected' && notification.data?.rejection_reason && (
                                                <div className="mt-3 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                                                    <div className="flex items-start gap-2">
                                                        <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                                        <div>
                                                            <p className="text-xs font-medium text-red-700 dark:text-red-300 mb-1">Reason for rejection:</p>
                                                            <p className="text-sm text-red-600 dark:text-red-400">{notification.data.rejection_reason}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {!notification.read && (
                                                <button
                                                    onClick={() => markReadMutation.mutate(notification.id)}
                                                    className="p-2 text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                    title="Mark as read"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteMutation.mutate(notification.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Timestamp */}
                                    <div className="mt-3 flex items-center gap-3">
                                        <span className="text-xs text-gray-400 dark:text-gray-500">
                                            {formatDate(notification.created_at)}
                                        </span>
                                        {!notification.read && (
                                            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 rounded-full">
                                                New
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
