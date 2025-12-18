'use client';

import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
    // This will be connected to state management/Supabase later
    const cartItems = [
        {
            id: '1',
            name: 'Reusable Stainless Steel Water Bottle',
            price: 43.88,
            quantity: 2,
            image: '/images/img (1).jpg'
        }
    ];

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 500 ? 0 : 25;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold mb-8"
                >
                    Shopping <span className="italic font-light">Cart</span>
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-6 flex gap-6"
                            >
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                                    <p className="text-2xl font-bold text-gray-900">${item.price}</p>
                                </div>
                                <div className="flex flex-col items-end justify-between">
                                    <button className="text-red-500 hover:text-red-600">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                    <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
                                        <button className="hover:text-teal-600">
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="font-semibold">{item.quantity}</span>
                                        <button className="hover:text-teal-600">
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-2xl p-6 h-fit sticky top-24"
                    >
                        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-semibold">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping</span>
                                <span className="font-semibold">{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <Link href="/checkout">
                            <motion.button
                                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-full font-semibold transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Proceed to Checkout
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
