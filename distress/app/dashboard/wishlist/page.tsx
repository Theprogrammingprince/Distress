'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2, ExternalLink } from 'lucide-react';
import { useWishlist, useRemoveFromWishlist } from '@/lib/hooks/useWishlist';
import { useAddToCart } from '@/lib/hooks/useCart';
import toast from 'react-hot-toast';

export default function WishlistPage() {
    const { data: wishlist, isLoading } = useWishlist();
    const removeFromWishlist = useRemoveFromWishlist();
    const addToCart = useAddToCart();

    const handleRemove = async (id: string) => {
        try {
            await removeFromWishlist.mutateAsync(id);
            toast.success('Removed from wishlist');
        } catch (error) {
            toast.error('Failed to remove item');
        }
    };

    const handleAddToCart = async (productId: string) => {
        const loadingToast = toast.loading('Adding to cart...');
        try {
            await addToCart.mutateAsync({ product_id: productId, quantity: 1 });
            toast.dismiss(loadingToast);
            toast.success('Added to cart!');
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error('Failed to add to cart');
        }
    };

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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">My Wishlist</h1>
                <p className="text-gray-600 dark:text-gray-400">Save items you love for later</p>
            </div>

            {!wishlist || wishlist.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Explore our products and save your favorites!</p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                    >
                        Explore Products
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((item: any) => (
                        <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-700">
                                {item.products?.image_url ? (
                                    <Image
                                        src={item.products.image_url}
                                        alt={item.products.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                        <Heart className="w-12 h-12" />
                                    </div>
                                )}
                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors backdrop-blur-sm"
                                    title="Remove from wishlist"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="p-4">
                                <Link href={`/shop/product/${item.product_id}`} className="group">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-teal-600 transition-colors line-clamp-1">
                                        {item.products?.name}
                                    </h3>
                                </Link>
                                <p className="text-teal-600 font-bold mb-4">
                                    ₦{item.products?.price?.toLocaleString()}
                                </p>

                                <button
                                    onClick={() => handleAddToCart(item.product_id)}
                                    disabled={item.products?.stock === 0}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-teal-600 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    {item.products?.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
