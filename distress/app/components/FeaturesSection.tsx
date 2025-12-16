'use client';

import { motion } from 'framer-motion';
import { Truck, Shield, Headphones, CreditCard, RotateCcw, Award } from 'lucide-react';

const features = [
    {
        icon: Truck,
        title: 'Free Shipping',
        description: 'On orders over $50',
        color: 'from-blue-500 to-blue-600'
    },
    {
        icon: Shield,
        title: 'Secure Payment',
        description: '100% protected',
        color: 'from-green-500 to-green-600'
    },
    {
        icon: Headphones,
        title: '24/7 Support',
        description: 'Dedicated support',
        color: 'from-purple-500 to-purple-600'
    },
    {
        icon: RotateCcw,
        title: 'Easy Returns',
        description: '30-day return policy',
        color: 'from-amber-500 to-amber-600'
    },
    {
        icon: CreditCard,
        title: 'Flexible Payment',
        description: 'Multiple payment options',
        color: 'from-pink-500 to-pink-600'
    },
    {
        icon: Award,
        title: 'Best Quality',
        description: 'Premium products',
        color: 'from-teal-500 to-teal-600'
    },
];

export default function FeaturesSection() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center group"
                        >
                            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <feature.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
