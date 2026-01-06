'use client';

import { useState } from 'react';
import { Search, Package, ExternalLink, Calendar, MapPin, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useOrders } from '@/lib/hooks/useOrders';
import { format } from 'date-fns';

export default function MyOrdersPage() {
    const { data: orders, isLoading } = useOrders();
    const [searchQuery, setSearchQuery] = useState('');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'shipped':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'processing':
                return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const filteredOrders = orders?.filter((order: any) =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">My Orders</h1>
                <p className="text-gray-600 dark:text-gray-400">Track and manage your recent purchases</p>
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-6 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Order ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                    />
                </div>
            </div>

            {/* Orders List */}
            {!filteredOrders || filteredOrders.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No orders found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">You haven't placed any orders yet.</p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {filteredOrders.map((order: any) => (
                        <div key={order.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white order-id">
                                                #{order.id.slice(0, 8)}
                                            </h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)} capitalize`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{format(new Date(order.created_at), 'MMM dd, yyyy')}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <CreditCard className="w-4 h-4" />
                                                <span className="capitalize">{order.payment_method}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Amount</p>
                                        <p className="text-2xl font-bold text-teal-600">
                                            ₦{order.total_amount.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                                    <div className="flex items-start gap-3 mb-4">
                                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">Shipping Address</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                {order.shipping_address?.address}, {order.shipping_address?.city}, {order.shipping_address?.state}, {order.shipping_address?.zip_code}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <Link
                                            href={`/dashboard/orders/${order.id}`}
                                            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors"
                                        >
                                            View Order Details
                                            <ExternalLink className="w-4 h-4" />
                                        </Link>
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
