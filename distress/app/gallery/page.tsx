'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const galleryImages = [
    '/images/img (1).jpg',
    '/images/img (2).jpg',
    '/images/img (3).jpg',
    '/images/img (4).jpg',
    '/images/img (5).jpg',
    '/images/img (6).jpg',
    '/images/img (7).jpg',
    '/images/img (8).jpg',
    '/images/img (9).jpg',
    '/images/img (10).jpg',
    '/images/img (11).jpg',
    '/images/img (12).jpg'
];

export default function GalleryPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-gray-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold mb-4"
                    >
                        Our <span className="italic font-light">Gallery</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-300"
                    >
                        Explore our curated collection of premium products
                    </motion.p>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {galleryImages.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                whileHover={{ scale: 1.05, zIndex: 10 }}
                                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg"
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
        </div>
    );
}
