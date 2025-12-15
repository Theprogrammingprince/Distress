'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf, Award } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    // Parallax effects
    const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={ref} className="relative bg-white overflow-hidden">
            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                style={{ opacity }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 min-h-[500px] md:min-h-[600px] items-center py-8 md:py-12 lg:py-20">
                    {/* Left Column - Content with Parallax */}
                    <motion.div
                        className="space-y-4 md:space-y-6 lg:space-y-8 order-2 lg:order-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
                        style={{ y: textY }}
                    >
                        {/* Small Label */}
                        <motion.div
                            className="inline-block"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-sm font-medium tracking-wide text-gray-600">
                                Distress
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900"
                            initial={{ opacity: 0, x: -60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                Premium Products
                            </motion.span>
                            <br />
                            <motion.span
                                className="italic font-light"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                for a better home
                            </motion.span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            className="text-sm md:text-base lg:text-lg text-gray-600 max-w-md leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Discover quality furniture, electronics, and home decor at unbeatable distress sale prices. Save up to 60% on premium brands.
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Link href="/shop">
                                <motion.button
                                    className="group inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium transition-all shadow-lg text-sm md:text-base"
                                    whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.2)" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Shop Now
                                    <motion.div
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.div>
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Image with Parallax */}
                    <motion.div
                        className="relative order-1 lg:order-2"
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ y: imageY }}
                    >
                        {/* Main Hero Image */}
                        <motion.div
                            className="relative aspect-[4/3] lg:aspect-square rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Image
                                src="/images/img (8).jpg"
                                alt="Premium Furniture Collection"
                                fill
                                className="object-cover"
                                priority
                            />

                            {/* Stats Badges Overlay */}
                            <motion.div
                                className="absolute top-4 md:top-6 right-4 md:right-6 space-y-2 md:space-y-3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1, duration: 0.6 }}
                            >
                                {/* Badge 1 - Natural Materials */}
                                <motion.div
                                    className="bg-white/95 backdrop-blur-sm rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 shadow-lg"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex items-center gap-1 md:gap-2 mb-1">
                                        <Leaf className="w-3 md:w-4 h-3 md:h-4 text-green-600" />
                                        <p className="text-xs text-gray-600 font-medium">Natural</p>
                                    </div>
                                    <p className="text-xs md:text-sm font-semibold text-gray-900">Materials</p>
                                </motion.div>

                                {/* Badge 2 - Satisfaction */}
                                <motion.div
                                    className="bg-gray-900/95 backdrop-blur-sm rounded-lg md:rounded-xl px-4 md:px-5 py-3 md:py-4 shadow-lg"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    animate={{
                                        boxShadow: [
                                            "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                                            "0 20px 25px -5px rgb(0 0 0 / 0.2)",
                                            "0 10px 15px -3px rgb(0 0 0 / 0.1)"
                                        ]
                                    }}
                                    transition={{
                                        boxShadow: { repeat: Infinity, duration: 2 }
                                    }}
                                >
                                    <motion.p
                                        className="text-3xl md:text-4xl font-bold text-white leading-none mb-1"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                                    >
                                        96%
                                    </motion.p>
                                    <p className="text-xs text-white/80">Satisfaction</p>
                                </motion.div>
                            </motion.div>

                            {/* Bottom Left Badge - Quality */}
                            <motion.div
                                className="absolute bottom-4 md:bottom-6 left-4 md:left-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4, duration: 0.6 }}
                            >
                                <motion.div
                                    className="bg-white/95 backdrop-blur-sm rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 shadow-lg flex items-center gap-2"
                                    whileHover={{ scale: 1.05, x: 2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Award className="w-4 md:w-5 h-4 md:h-5 text-amber-500" />
                                    <div>
                                        <p className="text-xs text-gray-600">Premium</p>
                                        <p className="text-xs md:text-sm font-semibold text-gray-900">Quality</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Floating elements */}
            <motion.div
                className="absolute top-20 left-10 w-16 md:w-20 h-16 md:h-20 bg-green-100 rounded-full blur-3xl opacity-30 hidden md:block"
                animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 4
                }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-24 md:w-32 h-24 md:h-32 bg-amber-100 rounded-full blur-3xl opacity-30 hidden md:block"
                animate={{
                    y: [0, 20, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 5,
                    delay: 1
                }}
            />
        </section>
    );
}
