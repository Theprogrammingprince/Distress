'use client';

import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { products } from '@/lib/products';
import { Zap } from 'lucide-react';

export default function DealsPage() {
    // Filter products with significant discounts
    const deals = products.filter(p => p.originalPrice && ((p.originalPrice - p.price) / p.originalPrice) >= 0.3);

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block mb-4"
                    >
                        <Zap className="w-16 h-16 mx-auto" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold mb-4"
                    >
                        Hot <span className="italic font-light">Deals</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-teal-100"
                    >
                        Limited time offers - Save up to 60% on premium products
                    </motion.p>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
