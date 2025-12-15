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

                    {/* Category Links */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm">
                        <Link href="/furniture" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Furniture
                        </Link>
                        <Link href="/electronics" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Electronics
                        </Link>
                        <Link href="/home-decor" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Home Decor
                        </Link>
                        <Link href="/deals" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Deals
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

                {/* Copyright */}
                <motion.div
                    className="mt-12 pt-8 border-t border-gray-200"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <p className="text-xs text-gray-500 text-center">
                        © 2024 Distress. All rights reserved. Premium products at unbeatable prices.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
