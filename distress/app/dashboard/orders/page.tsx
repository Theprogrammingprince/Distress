'use client';

import { useState } from 'react';
import { Search, Filter, MoreVertical } from 'lucide-react';

const orders = [
    { id: 'ORD-001', customer: 'John Doe', product: 'Reusable Water Bottle', amount: '$43.88', status: 'Completed', date: '2026-01-15' },
    { id: 'ORD-002', customer: 'Jane Smith', product: 'Eco-Friendly Tote Bag', amount: '$29.99', status: 'Processing', date: '2026-01-14' },
    { id: 'ORD-003', customer: 'Mike Johnson', product: 'Bamboo Cutlery Set', amount: '$24.99', status: 'Pending', date: '2026-01-14' },
    { id: 'ORD-004', customer: 'Sarah Williams', product: 'Organic Cotton T-Shirt', amount: '$35.00', status: 'Completed', date: '2026-01-13' },
    { id: 'ORD-005', customer: 'Tom Brown', product: 'Recycled Notebook', amount: '$12.50', status: 'Cancelled', date: '2026-01-12' },
];

export default function OrdersPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-100 text-green-800';
            case 'Processing':
                return 'bg-blue-100 text-blue-800';
            case 'Pending':
                return 'bg-amber-100 text-amber-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Orders</h1>
                <p className="text-sm text-gray-500">Manage and track all customer orders</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <Filter className="w-5 h-5" />
                        <span className="text-sm font-medium">Filter</span>
                    </button>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-gray-900">{order.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600">{order.customer}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600">{order.product}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-semibold text-gray-900">{order.amount}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600">{order.date}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg ml-auto block">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
