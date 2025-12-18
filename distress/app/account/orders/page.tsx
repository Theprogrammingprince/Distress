'use client';

import { motion } from 'framer-motion';
import { Package, ChevronRight, Clock, CheckCircle, Truck } from 'lucide-react';
import Image from 'next/image';

export default function OrdersPage() {
    const orders = [
        {
            id: 'ORD-2453',
            date: 'Dec 18, 2024',
            status: 'Processing',
            total: 2450.00,
            items: [
                { name: 'Modern Sofa', image: '/images/img (1).jpg', quantity: 1 }
            ]
        },
        {
            id: 'ORD-2390',
            date: 'Dec 10, 2024',
            status: 'Delivered',
            total: 120.00,
            items: [
                { name: 'Table Lamp', image: '/images/img (3).jpg', quantity: 2 }
            ]
        },
        {
            id: 'ORD-2100',
            date: 'Nov 25, 2024',
            status: 'Delivered',
            total: 890.00,
            items: [
                { name: 'Office Chair', image: '/images/img (4).jpg', quantity: 1 }
            ]
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Processing': return 'text-amber-600 bg-amber-50';
            case 'Delivered': return 'text-teal-600 bg-teal-50';
            case 'Cancelled': return 'text-red-600 bg-red-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Processing': return <Clock className="w-4 h-4" />;
            case 'Delivered': return <CheckCircle className="w-4 h-4" />;
            case 'Shipped': return <Truck className="w-4 h-4" />;
            default: return <Package className="w-4 h-4" />;
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">My Orders</h1>
                <p className="text-gray-500">Track and manage your recent purchases</p>
            </div>

            <div className="space-y-4">
                {orders.map((order, index) => (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-50">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-bold text-gray-900">{order.id}</h3>
                                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                        {getStatusIcon(order.status)}
                                        {order.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">Placed on {order.date}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Total Amount</p>
                                    <p className="font-bold text-gray-900">${order.total.toFixed(2)}</p>
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {order.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
