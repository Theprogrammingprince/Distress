'use client';

import { useWishlist } from '@/app/context/WishlistContext';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/products';

export default function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlist();

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">My Wishlist</h1>
                <p className="text-gray-500">
                    {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
                </p>
            </div>

            {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl border border-gray-100 overflow-hidden group"
                        >
                            <div className="relative aspect-square">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <button
                                    onClick={() => removeFromWishlist(product.id)}
                                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 hover:bg-white transition-colors"
                                >
                                    <Heart className="w-5 h-5 fill-current" />
                                </button>
                            </div>
                            <div className="p-4">
                                <div className="mb-2">
                                    <h3 className="font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
                                    <p className="text-sm text-gray-500">{product.category}</p>
                                </div>
                                <div className="flex items-end justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                                        {product.originalPrice && (
                                            <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
                                        )}
                                    </div>
                                    <Link href={`/shop/${product.id}`}>
                                        <button className="p-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors">
                                            <ShoppingBag className="w-5 h-5" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-400 mb-2">Your wishlist is empty</h2>
                    <p className="text-gray-500 mb-6">Start saving items you love!</p>
                    <Link
                        href="/shop"
                        className="inline-block px-6 py-2.5 bg-teal-600 text-white rounded-full font-medium hover:bg-teal-700 transition-colors"
                    >
                        Browse Products
                    </Link>
                </div>
            )}
        </div>
    );
}
