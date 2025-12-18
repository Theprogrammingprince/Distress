'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, ArrowRight, Package, Shield, Truck, Award } from 'lucide-react';

const heroSlides = [
    { id: 1, image: '/images/img (1).jpg', title: 'Premium Quality', subtitle: 'Distress' },
    { id: 2, image: '/images/img (2).jpg', title: 'Best Prices', subtitle: 'Distress' },
    { id: 3, image: '/images/img (3).jpg', title: 'Fast Delivery', subtitle: 'Distress' },
    { id: 4, image: '/images/img (4).jpg', title: 'Eco-Friendly', subtitle: 'Distress' }
];

const galleryImages = [
    '/images/img (5).jpg',
    '/images/img (6).jpg',
    '/images/img (7).jpg',
    '/images/img (8).jpg',
    '/images/img (9).jpg',
    '/images/img (10).jpg'
];

const testimonials = [
    {
        id: 1,
        rating: 4.9,
        text: "Distress has completely transformed how I shop for home essentials. The quality is outstanding and the prices are unbeatable!",
        author: "Sarah Johnson",
        role: "Interior Designer"
    },
    {
        id: 2,
        rating: 5.0,
        text: "I've saved thousands on premium furniture. The distress sale model is genius - quality products at incredible prices.",
        author: "Michael Chen",
        role: "Homeowner"
    },
    {
        id: 3,
        rating: 4.8,
        text: "Fast shipping, excellent customer service, and products that exceed expectations. Highly recommended!",
        author: "Emma Davis",
        role: "Business Owner"
    },
    {
        id: 4,
        rating: 5.0,
        text: "The eco-friendly options are amazing. I can furnish my home sustainably without breaking the bank.",
        author: "James Wilson",
        role: "Environmental Advocate"
    }
];

export default function AboutPage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

    return (
        <div className="bg-white">
            {/* Hero Carousel */}
            <section className="relative h-[600px] bg-gray-900 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={heroSlides[currentSlide].image}
                            alt={heroSlides[currentSlide].title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/40" />
                    </motion.div>
                </AnimatePresence>

                {/* Content */}
                <div className="relative h-full flex items-center justify-center text-center text-white z-10">
                    <motion.div
                        key={`content-${currentSlide}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <p className="text-sm uppercase tracking-wider mb-4">{heroSlides[currentSlide].subtitle}</p>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">{heroSlides[currentSlide].title}</h1>
                        <Link href="/shop">
                            <motion.button
                                className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Shop Now
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>

                {/* Navigation */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all"
                >
                    <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all"
                >
                    <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* Best Sellers Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="relative aspect-square rounded-3xl overflow-hidden">
                                <Image
                                    src="/images/img (11).jpg"
                                    alt="Best Sellers"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                                Best <span className="italic font-light">sellers</span>
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Discover our most popular products loved by thousands of customers. At Distress, we bring you premium quality furniture, electronics, and home decor at unbeatable distress sale prices. Save up to 60% on top brands while enjoying exceptional quality and service.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Our curated collection features sustainable, eco-friendly products that don&apos;t compromise on style or functionality. Every item is carefully inspected to ensure it meets our high standards before reaching your home.
                            </p>
                            <Link href="/bestsellers">
                                <motion.button
                                    className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-medium inline-flex items-center gap-2 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Learn More
                                    <ArrowRight className="w-4 h-4" />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* New Arrivals Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6 order-2 lg:order-1"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                                New <span className="italic font-light">Arrival</span>
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Be the first to explore our latest additions! We constantly update our inventory with fresh, exciting products at distress prices. From modern furniture pieces to cutting-edge electronics and stylish home accessories.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Each new arrival is handpicked for quality, design, and value. Don&apos;t miss out on these limited-time opportunities to transform your space with premium products at incredible savings.
                            </p>
                            <Link href="/new-arrivals">
                                <motion.button
                                    className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-medium inline-flex items-center gap-2 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Explore Now
                                    <ArrowRight className="w-4 h-4" />
                                </motion.button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-1 lg:order-2"
                        >
                            <div className="relative aspect-square rounded-3xl overflow-hidden">
                                <Image
                                    src="/images/img (12).jpg"
                                    alt="New Arrivals"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center mb-12"
                    >
                        Our <span className="italic font-light">Collection</span>
                    </motion.h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {galleryImages.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                            >
                                <Image
                                    src={image}
                                    alt={`Gallery ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4">
                            What Our <span className="italic font-light">Customers Say</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Join thousands of satisfied customers who have transformed their homes with Distress
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-gray-50 rounded-2xl p-6 space-y-4"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl font-bold text-gray-900">{testimonial.rating}</span>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(testimonial.rating)
                                                    ? 'fill-amber-400 text-amber-400'
                                                    : 'fill-gray-300 text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">{testimonial.text}</p>
                                <div className="pt-4 border-t border-gray-200">
                                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center mb-16"
                    >
                        Why Choose <span className="italic font-light">Distress</span>
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Package, title: 'Quality Products', desc: 'Premium items at distress prices' },
                            { icon: Shield, title: 'Secure Shopping', desc: '100% secure payment processing' },
                            { icon: Truck, title: 'Fast Delivery', desc: 'Free shipping on orders over $500' },
                            { icon: Award, title: 'Best Prices', desc: 'Save up to 60% on top brands' }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center space-y-4"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full">
                                    <feature.icon className="w-8 h-8 text-teal-600" />
                                </div>
                                <h3 className="text-xl font-semibold">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
