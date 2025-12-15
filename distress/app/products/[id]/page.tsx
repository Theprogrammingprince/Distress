'use client';

import { motion } from 'framer-motion';
import ProductCard from '../../components/ProductCard';
import { products } from '@/lib/products';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Star, ShoppingCart, Heart, Share2 } from 'lucide-react';

export default function ProductDetailPage() {
    const params = useParams();
    const product = products.find(p => p.id === params.id) || products[0];

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100"
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div>
                            <p className="text-teal-600 font-medium mb-2">{product.category}</p>
                            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < product.rating
                                                    ? 'fill-amber-400 text-amber-400'
                                                    : 'fill-gray-200 text-gray-200'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-600">({product.reviews} reviews)</span>
                            </div>
                        </div>

                        <div className="flex items-baseline gap-4">
                            <span className="text-4xl font-bold">${product.price}</span>
                            {product.originalPrice && (
                                <>
                                    <span className="text-2xl text-gray-400 line-through">
                                        ${product.originalPrice}
                                    </span>
                                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                                        Save ${(product.originalPrice - product.price).toFixed(2)}
                                    </span>
                                </>
                            )}
                        </div>

                        <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

                        <div className="flex gap-4">
                            <motion.button
                                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </motion.button>
                            <button className="p-4 border-2 border-gray-300 rounded-full hover:border-teal-600 hover:text-teal-600 transition-colors">
                                <Heart className="w-6 h-6" />
                            </button>
                            <button className="p-4 border-2 border-gray-300 rounded-full hover:border-teal-600 hover:text-teal-600 transition-colors">
                                <Share2 className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="border-t pt-6 space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Availability:</span>
                                <span className="font-semibold text-green-600">In Stock</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Category:</span>
                                <span className="font-semibold">{product.category}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Free Shipping:</span>
                                <span className="font-semibold">On orders over $500</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Related Products */}
                <section className="mt-20">
                    <h2 className="text-3xl font-bold mb-8">
                        Related <span className="italic font-light">Products</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.slice(0, 4).map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
