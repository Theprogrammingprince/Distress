'use client';

import { motion } from 'framer-motion';
import { Briefcase, Heart, TrendingUp, Users } from 'lucide-react';

const openPositions = [
    {
        title: 'Senior Frontend Developer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time'
    },
    {
        title: 'Product Manager',
        department: 'Product',
        location: 'New York, NY',
        type: 'Full-time'
    },
    {
        title: 'Customer Success Manager',
        department: 'Support',
        location: 'Remote',
        type: 'Full-time'
    },
    {
        title: 'Marketing Specialist',
        department: 'Marketing',
        location: 'Los Angeles, CA',
        type: 'Full-time'
    }
];

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-gray-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold mb-4"
                    >
                        Join Our <span className="italic font-light">Team</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-300 max-w-2xl mx-auto"
                    >
                        Help us revolutionize online shopping with premium products at unbeatable prices
                    </motion.p>
                </div>
            </section>

            {/* Why Join Us */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-center mb-12"
                    >
                        Why Work at <span className="italic font-light">Distress</span>
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Heart, title: 'Great Culture', desc: 'Work with passionate, talented people' },
                            { icon: TrendingUp, title: 'Growth', desc: 'Continuous learning and development' },
                            { icon: Users, title: 'Collaboration', desc: 'Cross-functional teamwork' },
                            { icon: Briefcase, title: 'Benefits', desc: 'Competitive salary and perks' }
                        ].map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-6 text-center"
                            >
                                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <benefit.icon className="w-8 h-8 text-teal-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold mb-12"
                    >
                        Open <span className="italic font-light">Positions</span>
                    </motion.h2>

                    <div className="space-y-4">
                        {openPositions.map((position, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{position.title}</h3>
                                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <Briefcase className="w-4 h-4" />
                                                {position.department}
                                            </span>
                                            <span>📍 {position.location}</span>
                                            <span>⏰ {position.type}</span>
                                        </div>
                                    </div>
                                    <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
                                        Apply Now
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
