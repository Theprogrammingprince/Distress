'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Zap, TrendingUp } from 'lucide-react';

const flashDeals = [
    { id: 1, name: 'Modern Sofa Set', price: 299.99, originalPrice: 599.99, discount: 50, image: '/images/img (3).jpg', timeLeft: '2h 15m' },
    { id: 2, name: 'Smart Air Purifier', price: 89.99, originalPrice: 179.99, discount: 50, image: '/images/img (1).jpg', timeLeft: '2h 15m' },
    { id: 3, name: 'Premium Hair Dryer', price: 39.99, originalPrice: 79.99, discount: 50, image: '/images/img (5).jpg', timeLeft: '2h 15m' },
    { id: 4, name: 'Electric Pressure Cooker', price: 69.99, originalPrice: 139.99, discount: 50, image: '/images/img (7).jpg', timeLeft: '2h 15m' },
];

export default function FlashDeals() {
    return (
        <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between mb-8"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Flash <span className="italic font-light text-amber-600">Deals</span>
                            </h2>
                            <p className="text-sm text-gray-600">Limited time offers - Grab them fast!</p>
                        </div>
                    </div>
                    <Link
                        href="/deals"
                        className="hidden md:flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-semibold transition-colors"
                    >
                        View All Deals
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                {/* Flash Deals Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {flashDeals.map((deal, index) => (
                        <motion.div
                            key={deal.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/products/${deal.id}`}>
                                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group">
                                    {/* Image */}
                                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                                        <Image
                                            src={deal.image}
                                            alt={deal.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                            -{deal.discount}%
                                        </div>
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-amber-600">
                                            ⏰ {deal.timeLeft}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{deal.name}</h3>
                                        <div className="flex items-baseline gap-2 mb-3">
                                            <span className="text-2xl font-bold text-amber-600">${deal.price}</span>
                                            <span className="text-sm text-gray-400 line-through">${deal.originalPrice}</span>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full font-semibold transition-all"
                                        >
                                            Grab Deal
                                        </motion.button>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile View All Button */}
                <Link
                    href="/deals"
                    className="md:hidden flex items-center justify-center gap-2 mt-6 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-semibold transition-colors w-full"
                >
                    View All Deals
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}
