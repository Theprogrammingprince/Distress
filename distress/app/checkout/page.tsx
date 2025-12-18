'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
    const [step, setStep] = useState(1);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold mb-8 text-center"
                >
                    Secure <span className="italic font-light">Checkout</span>
                </motion.h1>

                {/* Progress Steps */}
                <div className="flex justify-center mb-12">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= s ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'
                                }`}>
                                {s}
                            </div>
                            {s < 3 && <div className={`w-20 h-1 ${step > s ? 'bg-teal-600' : 'bg-gray-200'}`} />}
                        </div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-2xl p-8 space-y-6"
                >
                    {step === 1 && (
                        <>
                            <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" placeholder="First Name" className="input-field" />
                                <input type="text" placeholder="Last Name" className="input-field" />
                                <input type="email" placeholder="Email" className="input-field md:col-span-2" />
                                <input type="text" placeholder="Address" className="input-field md:col-span-2" />
                                <input type="text" placeholder="City" className="input-field" />
                                <input type="text" placeholder="Postal Code" className="input-field" />
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-4 border-2 border-teal-600 rounded-xl">
                                    <CreditCard className="w-6 h-6 text-teal-600" />
                                    <span className="font-semibold">Credit/Debit Card</span>
                                </div>
                                <input type="text" placeholder="Card Number" className="input-field" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="MM/YY" className="input-field" />
                                    <input type="text" placeholder="CVV" className="input-field" />
                                </div>
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Lock className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Order Confirmed!</h2>
                            <p className="text-gray-600 mb-8">Thank you for your purchase. We&apos;ll send you a confirmation email shortly.</p>
                            <Link href="/">
                                <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-semibold">
                                    Continue Shopping
                                </button>
                            </Link>
                        </div>
                    )}

                    {step < 3 && (
                        <div className="flex justify-between pt-6">
                            {step > 1 && (
                                <button
                                    onClick={() => setStep(step - 1)}
                                    className="px-8 py-3 border-2 border-gray-300 rounded-full font-semibold hover:bg-gray-50"
                                >
                                    Back
                                </button>
                            )}
                            <button
                                onClick={() => setStep(step + 1)}
                                className="ml-auto bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-semibold"
                            >
                                {step === 2 ? 'Place Order' : 'Continue'}
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>

            <style jsx>{`
        .input-field {
          @apply w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500;
        }
      `}</style>
        </div>
    );
}
