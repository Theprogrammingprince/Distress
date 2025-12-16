'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PromoBanner() {
    return (
        <section className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Banner 1 - Furniture Sale */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative h-64 md:h-80 rounded-3xl overflow-hidden group cursor-pointer"
                    >
                        <Link href="/shop?category=furniture">
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-400">
                                <Image
                                    src="/images/img (3).jpg"
                                    alt="Furniture Sale"
                                    fill
                                    className="object-cover mix-blend-overlay opacity-40 group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="relative h-full flex flex-col justify-center p-8 md:p-12">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4">
                                        New Collection
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                                        Premium Furniture
                                        <br />
                                        <span className="italic font-light">Up to 60% Off</span>
                                    </h3>
                                    <p className="text-white/90 mb-6 text-sm md:text-base">
                                        Transform your space with our curated collection
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.05, x: 5 }}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-600 rounded-full font-semibold hover:shadow-lg transition-all"
                                    >
                                        Shop Now
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </motion.div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Banner 2 - Electronics Sale */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative h-64 md:h-80 rounded-3xl overflow-hidden group cursor-pointer"
                    >
                        <Link href="/shop?category=electronics">
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-500">
                                <Image
                                    src="/images/img (1).jpg"
                                    alt="Electronics Sale"
                                    fill
                                    className="object-cover mix-blend-overlay opacity-40 group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="relative h-full flex flex-col justify-center p-8 md:p-12">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4">
                                        Hot Deals
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                                        Smart Electronics
                                        <br />
                                        <span className="italic font-light">Save Big Today</span>
                                    </h3>
                                    <p className="text-white/90 mb-6 text-sm md:text-base">
                                        Latest tech at unbeatable distress prices
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.05, x: 5 }}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-amber-600 rounded-full font-semibold hover:shadow-lg transition-all"
                                    >
                                        Explore Deals
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </motion.div>
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
