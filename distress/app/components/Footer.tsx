import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Distress</h3>
                        <p className="text-sm text-gray-600">
                            Premium products at unbeatable distress sale prices.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Shop</h4>
                        <ul className="space-y-2">
                            <li><Link href="/bestsellers" className="text-sm text-gray-600 hover:text-gray-900">Bestsellers</Link></li>
                            <li><Link href="/new" className="text-sm text-gray-600 hover:text-gray-900">New Arrivals</Link></li>
                            <li><Link href="/deals" className="text-sm text-gray-600 hover:text-gray-900">Deals</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">About Us</Link></li>
                            <li><Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900">FAQ</Link></li>
                            <li><Link href="/shipping" className="text-sm text-gray-600 hover:text-gray-900">Shipping</Link></li>
                            <li><Link href="/returns" className="text-sm text-gray-600 hover:text-gray-900">Returns</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-600 text-center">
                        © 2024 Distress. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
