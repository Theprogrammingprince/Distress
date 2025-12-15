'use client';

import Link from 'next/link';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <span className="text-2xl font-bold text-gray-900">Distress</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                            Home
                        </Link>
                        <Link href="/bestsellers" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                            Bestsellers
                        </Link>
                        <Link href="/gallery" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                            Gallery
                        </Link>
                        <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                            About
                        </Link>
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-gray-700 hover:text-gray-900">
                            <Search className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-700 hover:text-gray-900">
                            <User className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-700 hover:text-gray-900 relative">
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                        <button
                            className="md:hidden p-2 text-gray-700 hover:text-gray-900"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white">
                    <nav className="px-4 py-4 space-y-3">
                        <Link href="/" className="block text-sm font-medium text-gray-700 hover:text-gray-900">
                            Home
                        </Link>
                        <Link href="/bestsellers" className="block text-sm font-medium text-gray-700 hover:text-gray-900">
                            Bestsellers
                        </Link>
                        <Link href="/gallery" className="block text-sm font-medium text-gray-700 hover:text-gray-900">
                            Gallery
                        </Link>
                        <Link href="/about" className="block text-sm font-medium text-gray-700 hover:text-gray-900">
                            About
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
