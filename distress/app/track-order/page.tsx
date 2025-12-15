'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package } from 'lucide-react';

export default function TrackOrderPage() {
    const [orderNumber, setOrderNumber] = useState('');
    const [email, setEmail] = useState('');

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <Package className="w-16 h-16 text-teal-600 mx-auto mb-4" />
                    <h1 className="text-4xl font-bold mb-4">
                        Track Your <span className="italic font-light">Order</span>
                    </h1>
                    <p className="text-gray-600">
                        Enter your order number and email to track your shipment
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl p-8 shadow-lg"
                >
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Order Number
                            </label>
                            <input
                                type="text"
                                value={orderNumber}
                                onChange={(e) => setOrderNumber(e.target.value)}
                                placeholder="e.g., ORD-123456"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <motion.button
                            type="submit"
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Search className="w-5 h-5" />
                            Track Order
                        </motion.button>
                    </form>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 text-center text-sm text-gray-600"
                >
                    <p>Need help? <a href="/contact" className="text-teal-600 hover:text-teal-700 font-semibold">Contact our support team</a></p>
                </motion.div>
            </div>
        </div>
    );
}
