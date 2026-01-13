'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Plus, Search, Filter, Grid3X3, List,
    CheckCircle, Clock, XCircle, Package,
    Edit, Trash2, Eye, MoreVertical, AlertTriangle
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useProfile } from '@/lib/hooks/useAuth';
import toast from 'react-hot-toast';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image_url: string;
    stock: number;
    rating: number;
    reviews_count: number;
    badge: string | null;
    verification_status: 'pending' | 'approved' | 'rejected';
    rejection_reason: string | null;
    created_at: string;
    seller_id: string;
}

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected';
type ViewMode = 'grid' | 'list';

export default function ProductsGridPage() {
    const queryClient = useQueryClient();
    const { data: profile } = useProfile();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

    // Fetch seller's products
    const { data: products = [], isLoading } = useQuery({
        queryKey: ['sellerProducts', profile?.id],
        queryFn: async () => {
            if (!profile?.id) return [];

            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('seller_id', profile.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data as Product[];
        },
        enabled: !!profile?.id,
    });

    // Delete product mutation
    const deleteMutation = useMutation({
        mutationFn: async (productId: string) => {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', productId);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sellerProducts'] });
            toast.success('Product deleted successfully');
            setSelectedProduct(null);
        },
        onError: () => {
            toast.error('Failed to delete product');
        }
    });

    // Filter products
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || product.verification_status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Stats
    const stats = {
        total: products.length,
        pending: products.filter(p => p.verification_status === 'pending').length,
        approved: products.filter(p => p.verification_status === 'approved').length,
        rejected: products.filter(p => p.verification_status === 'rejected').length,
    };

    const getStatusBadge = (status: Product['verification_status']) => {
        switch (status) {
            case 'approved':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                        <CheckCircle className="w-3 h-3" />
                        Approved
                    </span>
                );
            case 'pending':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full">
                        <Clock className="w-3 h-3" />
                        Pending
                    </span>
                );
            case 'rejected':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full">
                        <XCircle className="w-3 h-3" />
                        Rejected
                    </span>
                );
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleDelete = (productId: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            deleteMutation.mutate(productId);
        }
    };

    return (
        <div className="dark:bg-gray-900 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Products</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage and track your product listings</p>
                </div>
                <Link
                    href="/dashboard/products/create"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Product
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <button
                    onClick={() => setFilterStatus('all')}
                    className={`p-4 rounded-xl border transition-all ${filterStatus === 'all'
                            ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-teal-300'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div className="text-left">
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">All Products</p>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => setFilterStatus('pending')}
                    className={`p-4 rounded-xl border transition-all ${filterStatus === 'pending'
                            ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-amber-300'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-amber-600" />
                        </div>
                        <div className="text-left">
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => setFilterStatus('approved')}
                    className={`p-4 rounded-xl border transition-all ${filterStatus === 'approved'
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-green-300'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-left">
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.approved}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Approved</p>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => setFilterStatus('rejected')}
                    className={`p-4 rounded-xl border transition-all ${filterStatus === 'rejected'
                            ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-red-300'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                            <XCircle className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="text-left">
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.rejected}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Rejected</p>
                        </div>
                    </div>
                </button>
            </div>

            {/* Search and View Toggle */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2.5 rounded-lg border transition-colors ${viewMode === 'grid'
                                ? 'bg-teal-50 dark:bg-teal-900/30 border-teal-200 dark:border-teal-800 text-teal-600'
                                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400'
                            }`}
                    >
                        <Grid3X3 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2.5 rounded-lg border transition-colors ${viewMode === 'list'
                                ? 'bg-teal-50 dark:bg-teal-900/30 border-teal-200 dark:border-teal-800 text-teal-600'
                                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400'
                            }`}
                    >
                        <List className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Products Display */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-4 animate-pulse">
                            <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl mb-4" />
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                        </div>
                    ))}
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {searchQuery || filterStatus !== 'all' ? 'No products found' : 'No products yet'}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        {searchQuery || filterStatus !== 'all'
                            ? 'Try adjusting your search or filter criteria.'
                            : 'Start selling by creating your first product listing.'}
                    </p>
                    {!searchQuery && filterStatus === 'all' && (
                        <Link
                            href="/dashboard/products/create"
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            Create Product
                        </Link>
                    )}
                </div>
            ) : viewMode === 'grid' ? (
                /* Grid View */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {/* Product Image */}
                            <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
                                {product.image_url ? (
                                    <Image
                                        src={product.image_url}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Package className="w-12 h-12 text-gray-400" />
                                    </div>
                                )}
                                {product.badge && (
                                    <span className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                                        {product.badge}
                                    </span>
                                )}
                                <div className="absolute top-3 right-3">
                                    {getStatusBadge(product.verification_status)}
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
                                    {product.name}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 capitalize">
                                    {product.category.replace('-', ' ')}
                                </p>
                                <div className="flex items-baseline justify-between mb-3">
                                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                                        {formatPrice(product.price)}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        Stock: {product.stock}
                                    </span>
                                </div>

                                {/* Rejection Reason */}
                                {product.verification_status === 'rejected' && product.rejection_reason && (
                                    <div className="mb-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                        <div className="flex items-start gap-2">
                                            <AlertTriangle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                                            <p className="text-xs text-red-600 dark:text-red-400 line-clamp-2">
                                                {product.rejection_reason}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2">
                                    {product.verification_status !== 'approved' && (
                                        <Link
                                            href={`/dashboard/products/edit/${product.id}`}
                                            className="flex-1 px-3 py-2 text-sm font-medium text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/40 transition-colors text-center"
                                        >
                                            <Edit className="w-4 h-4 inline mr-1" />
                                            Edit
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* List View */
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Stock
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                                                    {product.image_url ? (
                                                        <Image
                                                            src={product.image_url}
                                                            alt={product.name}
                                                            width={48}
                                                            height={48}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <Package className="w-6 h-6 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white line-clamp-1">
                                                        {product.name}
                                                    </p>
                                                    {product.badge && (
                                                        <span className="text-xs text-red-500">{product.badge}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                                {product.category.replace('-', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                {formatPrice(product.price)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`text-sm ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-amber-600' : 'text-red-600'}`}>
                                                {product.stock}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(product.verification_status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {product.verification_status !== 'approved' && (
                                                    <Link
                                                        href={`/dashboard/products/edit/${product.id}`}
                                                        className="p-2 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                >
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
            )}
        </div>
    );
}
