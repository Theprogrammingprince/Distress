'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    {
        category: 'Orders & Shipping',
        questions: [
            {
                q: 'How long does shipping take?',
                a: 'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery. Free shipping is offered on all orders over $500.'
            },
            {
                q: 'Can I track my order?',
                a: 'Yes! Once your order ships, you\'ll receive a tracking number via email. You can also track your order on our Track Order page.'
            },
            {
                q: 'Do you ship internationally?',
                a: 'Yes, we ship to over 100 countries worldwide. International shipping times vary by location, typically 10-15 business days.'
            }
        ]
    },
    {
        category: 'Returns & Refunds',
        questions: [
            {
                q: 'What is your return policy?',
                a: 'We offer a 30-day return policy on most items. Products must be unused, in original packaging, and in resalable condition.'
            },
            {
                q: 'How do I return an item?',
                a: 'Contact our support team at returns@distress.com with your order number. We\'ll send you a prepaid return label and process your refund within 5-7 business days of receiving the return.'
            },
            {
                q: 'Are there any items that can\'t be returned?',
                a: 'Yes, clearance items, personalized products, and items without original packaging cannot be returned.'
            }
        ]
    },
    {
        category: 'Products & Pricing',
        questions: [
            {
                q: 'Why are your prices so low?',
                a: 'Distress specializes in selling premium products at distress sale prices. We work directly with manufacturers and retailers to offer overstock, discontinued, and clearance items at up to 60% off retail prices.'
            },
            {
                q: 'Are your products authentic?',
                a: 'Absolutely! All our products are 100% authentic and come from authorized sources. We inspect every item to ensure quality before shipping.'
            },
            {
                q: 'Do you offer price matching?',
                a: 'Our prices are already heavily discounted, but if you find a lower price on an identical item, contact us and we\'ll do our best to match it.'
            }
        ]
    },
    {
        category: 'Account & Payment',
        questions: [
            {
                q: 'Do I need an account to shop?',
                a: 'No, you can checkout as a guest. However, creating an account allows you to track orders, save items to your wishlist, and checkout faster.'
            },
            {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and Apple Pay.'
            },
            {
                q: 'Is my payment information secure?',
                a: 'Yes! We use industry-standard SSL encryption to protect your payment information. We never store your full credit card details.'
            }
        ]
    }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-b border-gray-200 last:border-0"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex justify-between items-center text-left hover:text-teal-600 transition-colors"
            >
                <span className="font-semibold text-lg pr-8">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="w-5 h-5 flex-shrink-0" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-gray-600 leading-relaxed">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <HelpCircle className="w-16 h-16 text-teal-600 mx-auto mb-4" />
                    <h1 className="text-4xl font-bold mb-4">
                        Frequently Asked <span className="italic font-light">Questions</span>
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Find answers to common questions about Distress
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {faqs.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold mb-6 text-teal-600">{category.category}</h2>
                            <div>
                                {category.questions.map((faq, faqIndex) => (
                                    <FAQItem key={faqIndex} question={faq.q} answer={faq.a} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center bg-white rounded-2xl p-8"
                >
                    <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                    <p className="text-gray-600 mb-6">
                        Can't find the answer you're looking for? Our support team is here to help.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
                    >
                        Contact Support
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
