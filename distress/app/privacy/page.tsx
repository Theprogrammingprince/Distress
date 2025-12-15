'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <Shield className="w-16 h-16 text-teal-600 mx-auto mb-4" />
                    <h1 className="text-4xl font-bold mb-4">
                        Privacy <span className="italic font-light">Policy</span>
                    </h1>
                    <p className="text-gray-600">Last updated: December 15, 2026</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl p-8 space-y-8"
                >
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                        <p className="text-gray-600 leading-relaxed">
                            At Distress, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We collect information that you provide directly to us, including:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            <li>Name, email address, and contact information</li>
                            <li>Shipping and billing addresses</li>
                            <li>Payment information (processed securely through our payment providers)</li>
                            <li>Order history and preferences</li>
                            <li>Communications with our customer service team</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            <li>Process and fulfill your orders</li>
                            <li>Communicate with you about your orders and account</li>
                            <li>Send you marketing communications (with your consent)</li>
                            <li>Improve our website and services</li>
                            <li>Prevent fraud and enhance security</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We use SSL encryption for all data transmission and store sensitive information securely.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            You have the right to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            <li>Access your personal information</li>
                            <li>Correct inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Object to certain data processing activities</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                        <p className="text-gray-600 leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at privacy@distress.com or visit our <a href="/contact" className="text-teal-600 hover:text-teal-700 font-semibold">Contact page</a>.
                        </p>
                    </section>
                </motion.div>
            </div>
        </div>
    );
}
