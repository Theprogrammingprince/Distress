'use client';

import { motion } from 'framer-motion';
import { Truck, Globe, Clock, Shield } from 'lucide-react';

export default function ShippingPage() {
    const shippingMethods = [
        {
            icon: Truck,
            title: 'Standard Shipping',
            time: '5-7 Business Days',
            cost: '$25',
            description: 'Reliable delivery for most orders'
        },
        {
            icon: Clock,
            title: 'Express Shipping',
            time: '2-3 Business Days',
            cost: '$45',
            description: 'Faster delivery when you need it'
        },
        {
            icon: Globe,
            title: 'International Shipping',
            time: '10-15 Business Days',
            cost: 'Varies',
            description: 'We ship worldwide'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold mb-4">
                        Shipping <span className="italic font-light">Information</span>
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Fast, reliable delivery to your doorstep
                    </p>
                </motion.div>

                {/* Free Shipping Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-teal-600 text-white rounded-2xl p-8 mb-12 text-center"
                >
                    <Shield className="w-12 h-12 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Free Shipping on Orders Over $500</h2>
                    <p className="text-teal-100">Enjoy complimentary shipping on all qualifying orders</p>
                </motion.div>

                {/* Shipping Methods */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {shippingMethods.map((method, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 text-center"
                        >
                            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <method.icon className="w-8 h-8 text-teal-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                            <p className="text-teal-600 font-semibold mb-2">{method.time}</p>
                            <p className="text-2xl font-bold mb-2">{method.cost}</p>
                            <p className="text-sm text-gray-600">{method.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl p-8"
                >
                    <h2 className="text-2xl font-bold mb-6">Shipping Policy</h2>
                    <div className="space-y-4 text-gray-600">
                        <p>• All orders are processed within 1-2 business days</p>
                        <p>• You will receive a tracking number once your order ships</p>
                        <p>• Delivery times may vary based on location and availability</p>
                        <p>• International orders may be subject to customs fees</p>
                        <p>• We ship to all 50 US states and over 100 countries worldwide</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
