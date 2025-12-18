'use client';

import { useWishlist } from '@/app/context/WishlistContext';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import Link from 'next/link';

export default function AccountOverviewPage() {
    const { wishlist } = useWishlist();
    // In a real app, orders would come from a context or API
    const ordersCount = 12;

    const stats = [
        { label: 'Total Orders', value: ordersCount, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Wishlist Items', value: wishlist.length, icon: Heart, color: 'text-teal-600', bg: 'bg-teal-50' },
        { label: 'Reviews', value: 5, icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Hello, John!</h1>
                <p className="text-gray-500">From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-4"
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                    <Link href="/account/orders" className="text-sm font-medium text-teal-600 hover:text-teal-700">
                        View All
                    </Link>
                </div>

                <div className="space-y-4">
                    {/* Placeholder content for activity */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-100">
                            <ShoppingBag className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Order #2453 placed</p>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                        <span className="text-sm font-medium text-amber-600">Pending</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-100">
                            <Heart className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Added &quot;Smart Speaker&quot; to wishlist</p>
                            <p className="text-xs text-gray-500">1 day ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
