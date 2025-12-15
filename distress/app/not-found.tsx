'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Search, ShoppingBag, ArrowRight, Package } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900/20 flex items-center justify-center px-4 py-16">
            <div className="max-w-4xl w-full">
                <div className="text-center">
                    {/* Animated 404 SVG Illustration */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <svg
                            className="w-full max-w-md mx-auto"
                            viewBox="0 0 400 300"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Background circles */}
                            <motion.circle
                                cx="200"
                                cy="150"
                                r="120"
                                fill="#14B8A6"
                                opacity="0.1"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            <motion.circle
                                cx="200"
                                cy="150"
                                r="80"
                                fill="#F59E0B"
                                opacity="0.1"
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                            />

                            {/* 404 Text */}
                            <motion.text
                                x="200"
                                y="140"
                                fontSize="120"
                                fontWeight="bold"
                                fill="#14B8A6"
                                textAnchor="middle"
                                opacity="0.2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.2 }}
                                transition={{ delay: 0.3 }}
                            >
                                404
                            </motion.text>

                            {/* Shopping bag icon */}
                            <motion.g
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                            >
                                <rect x="150" y="120" width="100" height="120" rx="8" fill="#F59E0B" opacity="0.2" />
                                <rect x="160" y="130" width="80" height="100" rx="4" fill="none" stroke="#F59E0B" strokeWidth="3" />
                                <path
                                    d="M170 150 C170 140, 180 135, 190 135 C200 135, 210 140, 210 150"
                                    fill="none"
                                    stroke="#F59E0B"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                                <motion.circle
                                    cx="185"
                                    cy="180"
                                    r="3"
                                    fill="#14B8A6"
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <motion.circle
                                    cx="205"
                                    cy="180"
                                    r="3"
                                    fill="#14B8A6"
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                                />
                            </motion.g>

                            {/* Floating elements */}
                            <motion.circle
                                cx="80"
                                cy="80"
                                r="8"
                                fill="#14B8A6"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.circle
                                cx="320"
                                cy="100"
                                r="6"
                                fill="#F59E0B"
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                            />
                            <motion.rect
                                x="60"
                                y="200"
                                width="12"
                                height="12"
                                fill="#14B8A6"
                                opacity="0.6"
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                            <motion.rect
                                x="330"
                                y="220"
                                width="10"
                                height="10"
                                fill="#F59E0B"
                                opacity="0.6"
                                animate={{ rotate: [360, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                        </svg>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4">
                            Oops! Page Not Found
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-2">
                            Looks like this page went on a shopping spree and didn't come back!
                        </p>
                        <p className="text-base text-gray-500 dark:text-gray-400 mb-8">
                            The page you're looking for doesn't exist or has been moved.
                        </p>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                    >
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-semibold shadow-lg transition-colors"
                            >
                                <Home className="w-5 h-5" />
                                Back to Home
                            </motion.button>
                        </Link>
                        <Link href="/shop">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-semibold shadow-lg transition-colors"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                Continue Shopping
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="border-t border-gray-200 dark:border-gray-700 pt-8"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Or explore these popular pages:
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                href="/bestsellers"
                                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-teal-500 dark:hover:border-teal-500 transition-colors group"
                            >
                                <Package className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-teal-600" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-teal-600">
                                    Bestsellers
                                </span>
                            </Link>
                            <Link
                                href="/deals"
                                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-teal-500 dark:hover:border-teal-500 transition-colors group"
                            >
                                <svg className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-teal-600">
                                    Deals
                                </span>
                            </Link>
                            <Link
                                href="/about"
                                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-teal-500 dark:hover:border-teal-500 transition-colors group"
                            >
                                <svg className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-teal-600">
                                    About Us
                                </span>
                            </Link>
                            <Link
                                href="/contact"
                                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-teal-500 dark:hover:border-teal-500 transition-colors group"
                            >
                                <svg className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-teal-600">
                                    Contact
                                </span>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Search Suggestion */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        className="mt-8"
                    >
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                            Can't find what you're looking for?
                        </p>
                        <div className="max-w-md mx-auto relative">
                            <input
                                type="text"
                                placeholder="Search for products..."
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full transition-colors">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
