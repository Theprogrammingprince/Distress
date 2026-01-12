'use client';

import { motion } from 'framer-motion';
import { Package, DollarSign, ShoppingCart, TrendingUp, Eye, Heart, User, Clock } from 'lucide-react';
import Link from 'next/link';
import { useProfile } from '@/lib/hooks/useAuth';

export default function DashboardOverview() {
    const { data: profile, isLoading } = useProfile();

    const stats = [
        {
            label: 'Total Products',
            value: '248',
            change: '+12%',
            icon: Package,
            color: 'bg-blue-500'
        },
        {
            label: 'Total Revenue',
            value: '$45,231',
            change: '+18%',
            icon: DollarSign,
            color: 'bg-green-500'
        },
        {
            label: 'Total Orders',
            value: '1,429',
            change: '+8%',
            icon: ShoppingCart,
            color: 'bg-amber-500'
        },
        {
            label: 'Total Views',
            value: '12,543',
            change: '+23%',
            icon: Eye,
            color: 'bg-purple-500'
        }
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (profile?.role === 'buyer') {
        return (
            <div>
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        Welcome back, {profile.full_name?.split(' ')[0]}!
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Here's a quick overview of your account</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Link href="/dashboard/my-orders">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer h-full"
                        >
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                                <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">My Orders</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Track and view your order history</p>
                        </motion.div>
                    </Link>

                    <Link href="/dashboard/wishlist">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer h-full"
                        >
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mb-4">
                                <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Wishlist</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">View your saved items</p>
                        </motion.div>
                    </Link>

                    <Link href="/dashboard/profile">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer h-full"
                        >
                            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mb-4">
                                <User className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Profile Settings</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Update your information</p>
                        </motion.div>
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h2>
                        <Link href="/dashboard/my-orders" className="text-sm font-medium text-teal-600 hover:text-teal-700">
                            View All Orders
                        </Link>
                    </div>
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                        <p>No recent activity</p>
                    </div>
                </div>
            </div>
        );
    }

    // Default view for Client/Seller (Admin)
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Dashboard Overview</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back! Here's what's happening with your store</p>
            </div>

            {/* Verification Status Banner */}
            {profile?.verification_status === 'pending' && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-lg"
                >
                    <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Clock className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-1">
                                Account Under Review
                            </h3>
                            <p className="text-sm text-amber-800 dark:text-amber-300 mb-2">
                                Your seller account is currently being verified by our admin team. You will not be able to create products until your account is approved.
                            </p>
                            <p className="text-xs text-amber-700 dark:text-amber-400">
                                This process usually takes 24-48 hours. You'll receive an email notification once your account is verified.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            {profile?.verification_status === 'rejected' && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg"
                >
                    <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-sm font-bold">!</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-red-900 dark:text-red-200 mb-1">
                                Account Verification Failed
                            </h3>
                            <p className="text-sm text-red-800 dark:text-red-300 mb-2">
                                {profile.rejection_reason || 'Your account verification was unsuccessful. Please contact support for more details.'}
                            </p>
                            <Link
                                href="/contact"
                                className="text-sm font-medium text-red-700 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 underline"
                            >
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {profile?.verification_status === 'approved' ? (
                        <Link href="/dashboard/products/create">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors text-left"
                            >
                                <Package className="w-8 h-8 text-teal-600 mb-2" />
                                <p className="font-semibold text-gray-900 dark:text-white">Create Product</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Add a new product to your store</p>
                            </motion.button>
                        </Link>
                    ) : (
                        <div className="relative">
                            <motion.button
                                disabled
                                className="w-full p-4 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-900 text-left opacity-60 cursor-not-allowed"
                                title="Account verification required to create products"
                            >
                                <Package className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="font-semibold text-gray-500 dark:text-gray-600">Create Product</p>
                                <p className="text-sm text-gray-400 dark:text-gray-700">Requires account verification</p>
                            </motion.button>
                            <div className="absolute top-2 right-2">
                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full">
                                    🔒 Locked
                                </span>
                            </div>
                        </div>
                    )}
                    <Link href="/dashboard/orders">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors text-left"
                        >
                            <ShoppingCart className="w-8 h-8 text-teal-600 mb-2" />
                            <p className="font-semibold text-gray-900 dark:text-white">View Orders</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Manage your customer orders</p>
                        </motion.button>
                    </Link>
                    <Link href="/dashboard/products">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors text-left"
                        >
                            <TrendingUp className="w-8 h-8 text-teal-600 mb-2" />
                            <p className="font-semibold text-gray-900 dark:text-white">View Analytics</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Check your store performance</p>
                        </motion.button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
