'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';

export default function Footer() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <footer className="bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Top Section - Tagline and Links */}
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    {/* Tagline */}
                    <div className="max-w-md">
                        <p className="text-gray-700 text-base leading-relaxed">
                            Distress promotes sustainable shopping with beautifully curated{' '}
                            <span className="italic font-medium">premium products!</span>
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm">
                        <Link href="/track-order" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Track Order
                        </Link>
                        <Link href="/shipping" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Shipping Info
                        </Link>
                        <Link href="/returns" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Returns
                        </Link>
                        <Link href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">
                            FAQ
                        </Link>
                    </div>
                </motion.div>

                {/* Join Button */}
                <motion.div
                    className="mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <Link href="/signup">
                        <motion.button
                            className="px-6 py-2.5 border-2 border-gray-900 text-gray-900 rounded-full text-sm font-medium hover:bg-gray-900 hover:text-white transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Join Us Now →
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Middle Section - Large Brand Name */}
                <motion.div
                    className="mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h2 className="text-7xl sm:text-8xl md:text-9xl font-bold text-gray-200 tracking-tight">
                        Distress<span className="italic font-light">.</span>
                    </h2>
                </motion.div>

                {/* Bottom Section - Social Links */}
                <motion.div
                    className="flex justify-end"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <div className="flex flex-col gap-3 text-sm">
                        <Link
                            href="https://twitter.com"
                            target="_blank"
                            className="flex items-center justify-between gap-8 text-gray-600 hover:text-gray-900 transition-colors group"
                        >
                            <span>Twitter</span>
                            <Twitter className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="https://instagram.com"
                            target="_blank"
                            className="flex items-center justify-between gap-8 text-gray-600 hover:text-gray-900 transition-colors group"
                        >
                            <span>Instagram</span>
                            <Instagram className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="https://linkedin.com"
                            target="_blank"
                            className="flex items-center justify-between gap-8 text-gray-600 hover:text-gray-900 transition-colors group"
                        >
                            <span>LinkedIn</span>
                            <Linkedin className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="https://facebook.com"
                            target="_blank"
                            className="flex items-center justify-between gap-8 text-gray-600 hover:text-gray-900 transition-colors group"
                        >
                            <span>Facebook</span>
                            <Facebook className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>

                {/* Additional Footer Links */}
                <motion.div
                    className="mt-12 pt-8 border-t border-gray-200"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Shop</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/shop" className="text-gray-600 hover:text-gray-900">All Products</Link></li>
                                <li><Link href="/bestsellers" className="text-gray-600 hover:text-gray-900">Bestsellers</Link></li>
                                <li><Link href="/deals" className="text-gray-600 hover:text-gray-900">Deals</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</Link></li>
                                <li><Link href="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
                                <li><Link href="/shipping" className="text-gray-600 hover:text-gray-900">Shipping</Link></li>
                                <li><Link href="/returns" className="text-gray-600 hover:text-gray-900">Returns</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/about" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
                                <li><Link href="/careers" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
                                <li><Link href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Account</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/signin" className="text-gray-600 hover:text-gray-900">Sign In</Link></li>
                                <li><Link href="/signup" className="text-gray-600 hover:text-gray-900">Sign Up</Link></li>
                                <li><Link href="/track-order" className="text-gray-600 hover:text-gray-900">Track Order</Link></li>
                                <li><Link href="/wishlist" className="text-gray-600 hover:text-gray-900">Wishlist</Link></li>
                            </ul>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 text-center">
                        © 2024 Distress. All rights reserved. Premium products at unbeatable prices.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
