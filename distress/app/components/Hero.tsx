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

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.4, 0.25, 1]
            }
        }
    };

    const slideInLeft = {
        hidden: { opacity: 0, x: -60 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.4, 0.25, 1]
            }
        }
    };

    const slideInRight = {
        hidden: { opacity: 0, x: 60 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.4, 0.25, 1]
            }
        }
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.4, 0.25, 1]
            }
        }
    };

    return (
        <section ref={ref} className="relative bg-white overflow-hidden">
            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                style={{ opacity }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 min-h-[600px] items-center py-12 lg:py-20">
                    {/* Left Column - Content with Parallax */}
                    <motion.div
                        className="space-y-6 lg:space-y-8 order-2 lg:order-1"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        style={{ y: textY }}
                    >
                        {/* Small Label with slide animation */}
                        <motion.div
                            className="inline-block"
                            variants={itemVariants}
                        >
                            <span className="text-sm font-medium tracking-wide text-gray-600">
                                Distress
                            </span>
                        </motion.div>

                        {/* Main Heading with staggered word animation */}
                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900"
                            variants={slideInLeft}
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

                        {/* Description with fade-in */}
                        <motion.p
                            className="text-base md:text-lg text-gray-600 max-w-md leading-relaxed"
                            variants={itemVariants}
                        >
                            Discover quality furniture, electronics, and home decor at unbeatable distress sale prices. Save up to 60% on premium brands.
                        </motion.p>

                        {/* CTA Button with scale animation */}
                        <motion.div
                            variants={scaleIn}
                        >
                            <Link href="/shop">
                                <motion.button
                                    className="group inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg"
                                    whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.2)" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Shop Now
                                    <motion.div
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
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
                        variants={slideInRight}
                        initial="hidden"
                        animate="visible"
                        style={{ y: imageY }}
                    >
                        {/* Main Hero Image */}
                        <motion.div
                            className="relative aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl"
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

                            {/* Stats Badges Overlay with staggered animation */}
                            <motion.div
                                className="absolute top-6 right-6 space-y-3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1, duration: 0.6 }}
                            >
                                {/* Badge 1 - Natural Materials */}
                                <motion.div
                                    className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <Leaf className="w-4 h-4 text-green-600" />
                                        <p className="text-xs text-gray-600 font-medium">Natural</p>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900">Materials</p>
                                </motion.div>

                                {/* Badge 2 - Discount Percentage with pulse */}
                                <motion.div
                                    className="bg-gray-900/95 backdrop-blur-sm rounded-xl px-5 py-4 shadow-lg"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    animate={{
                                        boxShadow: [
                                            "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                                            "0 20px 25px -5px rgb(0 0 0 / 0.2)",
                                            "0 10px 15px -3px rgb(0 0 0 / 0.1)"
                                        ]
                                    }}
                                    transition={{
                                        boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                                    }}
                                >
                                    <motion.p
                                        className="text-4xl font-bold text-white leading-none mb-1"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                                    >
                                        96%
                                    </motion.p>
                                    <p className="text-xs text-white/80">Satisfaction</p>
                                </motion.div>
                            </motion.div>

                            {/* Bottom Left Badge - Quality with slide-in */}
                            <motion.div
                                className="absolute bottom-6 left-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4, duration: 0.6 }}
                            >
                                <motion.div
                                    className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg flex items-center gap-2"
                                    whileHover={{ scale: 1.05, x: 2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Award className="w-5 h-5 text-amber-500" />
                                    <div>
                                        <p className="text-xs text-gray-600">Premium</p>
                                        <p className="text-sm font-semibold text-gray-900">Quality</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Floating elements for extra visual interest */}
            <motion.div
                className="absolute top-20 left-10 w-20 h-20 bg-green-100 rounded-full blur-3xl opacity-30"
                animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-30"
                animate={{
                    y: [0, 20, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                    delay: 1
                }}
            />
        </section>
    );
}
