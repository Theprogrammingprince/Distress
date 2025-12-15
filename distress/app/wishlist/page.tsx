'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '@/lib/products';

export default function WishlistPage() {
    // This will be connected to user's wishlist from Supabase later
    const wishlistItems = products.slice(0, 4);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <Heart className="w-10 h-10 text-teal-600" />
                        <h1 className="text-4xl font-bold">
                            My <span className="italic font-light">Wishlist</span>
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
                    </p>
                </motion.div>

                {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistItems.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <Heart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-400 mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-500 mb-8">Start adding items you love!</p>
                        <a
                            href="/shop"
                            className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-semibold"
                        >
                            Browse Products
                        </a>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
