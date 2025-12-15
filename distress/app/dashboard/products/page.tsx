'use client';

import { useState } from 'react';
import { Search, Filter, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import Image from 'next/image';
import { products } from '@/lib/products';

export default function ProductsListPage() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Products List</h1>
                <p className="text-sm text-gray-500">Manage all your products in one place</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
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

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Stock</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    width={48}
                                                    height={48}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{product.name}</p>
                                                <p className="text-sm text-gray-500">SKU: {product.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600">{product.category}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-semibold text-gray-900">${product.price}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600">In Stock</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
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
