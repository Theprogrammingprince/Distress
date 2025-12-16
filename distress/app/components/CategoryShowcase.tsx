'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag } from 'lucide-react';

const categories = [
    { name: 'Furniture', icon: '🛋️', count: '250+ items', image: '/images/img (3).jpg', color: 'from-blue-500 to-blue-600' },
    { name: 'Electronics', icon: '📱', count: '180+ items', image: '/images/img (1).jpg', color: 'from-purple-500 to-purple-600' },
    { name: 'Home Decor', icon: '🏠', count: '320+ items', image: '/images/img (8).jpg', color: 'from-pink-500 to-pink-600' },
    { name: 'Kitchen', icon: '🍳', count: '150+ items', image: '/images/img (7).jpg', color: 'from-green-500 to-green-600' },
    { name: 'Personal Care', icon: '💆', count: '200+ items', image: '/images/img (5).jpg', color: 'from-amber-500 to-amber-600' },
    { name: 'Outdoor', icon: '🌿', count: '120+ items', image: '/images/img (2).jpg', color: 'from-teal-500 to-teal-600' },
];

export default function CategoryShowcase() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Shop by <span className="italic font-light text-teal-600">Category</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our wide range of premium products across different categories
                    </p>
                </motion.div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/shop?category=${category.name.toLowerCase()}`}>
                                <div className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer">
                                    {/* Background Image */}
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity`} />

                                    {/* Content */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                                        <span className="text-4xl mb-2">{category.icon}</span>
                                        <h3 className="font-bold text-lg mb-1 text-center">{category.name}</h3>
                                        <p className="text-xs opacity-90">{category.count}</p>
                                    </div>

                                    {/* Hover Effect */}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <ShoppingBag className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
