'use client';

import { useWishlist } from '@/app/context/WishlistContext';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import Link from 'next/link';

export default function AccountOverviewPage() {
    const { wishlist } = useWishlist();
    const ordersCount = 12; // Placeholder

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
        </div>
    );
}
