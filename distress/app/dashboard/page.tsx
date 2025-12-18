'use client';

import { motion } from 'framer-motion';
import { Package, DollarSign, ShoppingCart, TrendingUp, Eye } from 'lucide-react';
import Link from 'next/link';

export default function DashboardOverview() {
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

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard Overview</h1>
                <p className="text-sm text-gray-500">Welcome back! Here&apos;s what&apos;s happening with your store</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl p-6 border border-gray-200"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/dashboard/products/create">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-colors text-left"
                        >
                            <Package className="w-8 h-8 text-teal-600 mb-2" />
                            <p className="font-semibold text-gray-900">Create Product</p>
                            <p className="text-sm text-gray-500">Add a new product to your store</p>
                        </motion.button>
                    </Link>
                    <Link href="/dashboard/orders">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-colors text-left"
                        >
                            <ShoppingCart className="w-8 h-8 text-teal-600 mb-2" />
                            <p className="font-semibold text-gray-900">View Orders</p>
                            <p className="text-sm text-gray-500">Manage your customer orders</p>
                        </motion.button>
                    </Link>
                    <Link href="/dashboard/products">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-colors text-left"
                        >
                            <TrendingUp className="w-8 h-8 text-teal-600 mb-2" />
                            <p className="font-semibold text-gray-900">View Analytics</p>
                            <p className="text-sm text-gray-500">Check your store performance</p>
                        </motion.button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
