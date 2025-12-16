'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart } from 'lucide-react';

const trendingProducts = [
    { id: 1, name: 'Modern Velvet Sofa', price: 299.99, rating: 4.8, reviews: 234, image: '/images/img (3).jpg', badge: 'Trending' },
    { id: 2, name: 'Smart Air Purifier Pro', price: 89.99, rating: 4.9, reviews: 456, image: '/images/img (1).jpg', badge: 'Best Seller' },
    { id: 3, name: 'Ultrasonic Humidifier', price: 49.99, rating: 4.7, reviews: 189, image: '/images/img (2).jpg', badge: 'New' },
    { id: 4, name: 'Professional Hair Dryer', price: 39.99, rating: 4.6, reviews: 312, image: '/images/img (5).jpg', badge: 'Hot' },
    { id: 5, name: 'Electric Pressure Cooker', price: 69.99, rating: 4.8, reviews: 278, image: '/images/img (7).jpg', badge: 'Trending' },
    { id: 6, name: 'Rotating Hair Brush', price: 34.99, rating: 4.5, reviews: 156, image: '/images/img (4).jpg', badge: 'Sale' },
    { id: 7, name: 'Premium Dehumidifier', price: 79.99, rating: 4.7, reviews: 201, image: '/images/img (6).jpg', badge: 'New' },
    { id: 8, name: 'Electric Shaver Set', price: 44.99, rating: 4.6, reviews: 167, image: '/images/img (8).jpg', badge: 'Hot' },
];

const badgeColors: { [key: string]: string } = {
    'Trending': 'bg-purple-500',
    'Best Seller': 'bg-amber-500',
    'New': 'bg-green-500',
    'Hot': 'bg-red-500',
    'Sale': 'bg-blue-500',
};

export default function TrendingProducts() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Trending <span className="italic font-light text-teal-600">Products</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Most popular items loved by our customers
                    </p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trendingProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                                {/* Image Container */}
                                <div className="relative aspect-square overflow-hidden bg-gray-100">
                                    <Link href={`/products/${product.id}`}>
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </Link>

                                    {/* Badge */}
                                    <div className={`absolute top-3 left-3 ${badgeColors[product.badge]} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                                        {product.badge}
                                    </div>

                                    {/* Wishlist Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                                    >
                                        <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                                    </motion.button>

                                    {/* Quick Add to Cart */}
                                    <motion.button
                                        initial={{ opacity: 0, y: 20 }}
                                        whileHover={{ opacity: 1, y: 0 }}
                                        className="absolute bottom-3 left-3 right-3 py-2.5 bg-gray-900 text-white rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        Quick Add
                                    </motion.button>
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                    <Link href={`/products/${product.id}`}>
                                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-teal-600 transition-colors">
                                            {product.name}
                                        </h3>
                                    </Link>

                                    {/* Rating */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < Math.floor(product.rating)
                                                            ? 'text-amber-400 fill-amber-400'
                                                            : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            {product.rating} ({product.reviews})
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="p-2 bg-teal-50 hover:bg-teal-100 rounded-full transition-colors"
                                        >
                                            <ShoppingCart className="w-5 h-5 text-teal-600" />
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-semibold transition-colors"
                    >
                        View All Products
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
