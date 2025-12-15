'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <FileText className="w-16 h-16 text-teal-600 mx-auto mb-4" />
                    <h1 className="text-4xl font-bold mb-4">
                        Terms of <span className="italic font-light">Service</span>
                    </h1>
                    <p className="text-gray-600">Last updated: December 15, 2024</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl p-8 space-y-8"
                >
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
                        <p className="text-gray-600 leading-relaxed">
                            By accessing and using Distress, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Use of Service</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            You agree to use our service only for lawful purposes and in accordance with these Terms. You agree not to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            <li>Use the service in any way that violates applicable laws or regulations</li>
                            <li>Engage in any conduct that restricts or inhibits anyone's use of the service</li>
                            <li>Attempt to gain unauthorized access to any portion of the service</li>
                            <li>Use the service to transmit any malicious code or harmful content</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Product Information</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions, pricing, or other content is accurate, complete, reliable, current, or error-free. We reserve the right to correct any errors and to change or update information at any time without prior notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Orders and Payment</h2>
                        <p className="text-gray-600 leading-relaxed">
                            All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason. Payment must be received before we dispatch your order. We accept major credit cards, PayPal, and other payment methods as indicated on our website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
                        <p className="text-gray-600 leading-relaxed">
                            The service and its original content, features, and functionality are owned by Distress and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                        <p className="text-gray-600 leading-relaxed">
                            In no event shall Distress, its directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We reserve the right to modify or replace these Terms at any time. We will provide notice of any material changes by posting the new Terms on this page with an updated effective date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                        <p className="text-gray-600 leading-relaxed">
                            If you have any questions about these Terms, please contact us at legal@distress.com or visit our <a href="/contact" className="text-teal-600 hover:text-teal-700 font-semibold">Contact page</a>.
                        </p>
                    </section>
                </motion.div>
            </div>
        </div>
    );
}
