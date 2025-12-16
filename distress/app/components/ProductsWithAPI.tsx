'use client';

import { useProducts } from '../../lib/hooks/useProducts';
import { useAddToCart } from '../../lib/hooks/useCart';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';

export default function ProductsWithAPI() {
    const { data, isLoading, error } = useProducts({ limit: 8 });
    const addToCart = useAddToCart();

    const handleAddToCart = async (productId: string) => {
        try {
            await addToCart.mutateAsync({ product_id: productId, quantity: 1 });
            alert('Added to cart!');
        } catch (error) {
            alert('Failed to add to cart');
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600">Error loading products: {error.message}</p>
            </div>
        );
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data?.products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                        >
                            <div className="relative aspect-square bg-gray-100">
                                <Image
                                    src={product.image_url}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                                {product.badge && (
                                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                        {product.badge}
                                    </div>
                                )}
                            </div>

                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                    {product.name}
                                </h3>

                                {product.rating && (
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < Math.floor(product.rating!)
                                                        ? 'text-amber-400 fill-amber-400'
                                                        : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            {product.rating} ({product.reviews_count})
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-gray-900">
                                        ${product.price}
                                    </span>
                                    <button
                                        onClick={() => handleAddToCart(product.id)}
                                        disabled={addToCart.isPending}
                                        className="p-2 bg-teal-50 hover:bg-teal-100 rounded-full transition-colors disabled:opacity-50"
                                    >
                                        <ShoppingCart className="w-5 h-5 text-teal-600" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
