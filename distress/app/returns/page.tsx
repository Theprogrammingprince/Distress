'use client';

import { motion } from 'framer-motion';
import { RotateCcw, CheckCircle, XCircle } from 'lucide-react';

export default function ReturnsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <RotateCcw className="w-16 h-16 text-teal-600 mx-auto mb-4" />
                    <h1 className="text-4xl font-bold mb-4">
                        Returns & <span className="italic font-light">Exchanges</span>
                    </h1>
                    <p className="text-gray-600 text-lg">
                        We want you to love your purchase. If you're not satisfied, we're here to help.
                    </p>
                </motion.div>

                {/* 30-Day Return Policy */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-teal-600 text-white rounded-2xl p-8 mb-12 text-center"
                >
                    <h2 className="text-3xl font-bold mb-2">30-Day Return Policy</h2>
                    <p className="text-teal-100">Return any item within 30 days for a full refund</p>
                </motion.div>

                {/* Eligible vs Not Eligible */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-2xl p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                            <h3 className="text-2xl font-bold">Eligible for Return</h3>
                        </div>
                        <ul className="space-y-3 text-gray-600">
                            <li>• Unused items in original packaging</li>
                            <li>• Items with tags still attached</li>
                            <li>• Products in resalable condition</li>
                            <li>• Defective or damaged items</li>
                            <li>• Wrong item received</li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-2xl p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <XCircle className="w-8 h-8 text-red-600" />
                            <h3 className="text-2xl font-bold">Not Eligible</h3>
                        </div>
                        <ul className="space-y-3 text-gray-600">
                            <li>• Items used or worn</li>
                            <li>• Products without original packaging</li>
                            <li>• Clearance or final sale items</li>
                            <li>• Items returned after 30 days</li>
                            <li>• Personalized or custom items</li>
                        </ul>
                    </motion.div>
                </div>

                {/* Return Process */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl p-8 mb-8"
                >
                    <h2 className="text-2xl font-bold mb-6">How to Return an Item</h2>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center font-bold text-teal-600">
                                1
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Contact Us</h3>
                                <p className="text-gray-600">Email us at returns@distress.com with your order number</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center font-bold text-teal-600">
                                2
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Receive Return Label</h3>
                                <p className="text-gray-600">We'll send you a prepaid return shipping label</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center font-bold text-teal-600">
                                3
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Ship Your Return</h3>
                                <p className="text-gray-600">Pack the item securely and ship it back to us</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center font-bold text-teal-600">
                                4
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Get Your Refund</h3>
                                <p className="text-gray-600">Receive your refund within 5-7 business days</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                >
                    <p className="text-gray-600 mb-4">Have questions about returns?</p>
                    <a href="/contact" className="text-teal-600 hover:text-teal-700 font-semibold">
                        Contact our support team →
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
