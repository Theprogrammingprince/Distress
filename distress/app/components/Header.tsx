'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, X, Camera, TrendingUp, Gift, Sofa, Smartphone, Home as HomeIcon, Tag, UtensilsCrossed, Trees, Briefcase, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const searchCategories = [
    { name: 'Free Gifts For New Users', icon: Gift, href: '/shop?category=gifts' },
    { name: 'Furniture', icon: Sofa, href: '/shop?category=furniture' },
    { name: 'Electronics', icon: Smartphone, href: '/shop?category=electronics' },
    { name: 'Home Decor Items', icon: HomeIcon, href: '/shop?category=home-decor' },
    { name: 'Clearance Sale', icon: Tag, href: '/shop?category=clearance' },
    { name: 'Kitchen Appliances', icon: UtensilsCrossed, href: '/shop?category=kitchen' },
    { name: 'Outdoor & Garden', icon: Trees, href: '/shop?category=outdoor' },
    { name: 'Office Supplies', icon: Briefcase, href: '/shop?category=office' },
    { name: 'Deals Under $50', icon: DollarSign, href: '/shop?category=deals' }
];

const trendingProducts = [
    { name: 'Air Purifier', image: '/images/img (1).jpg', category: 'Home Appliances', price: 89.99 },
    { name: 'Humidifier', image: '/images/img (2).jpg', category: 'Home Appliances', price: 49.99 },
    { name: 'Modern Sofa', image: '/images/img (3).jpg', category: 'Furniture', price: 299.99 },
    { name: 'Electric Hair Brush', image: '/images/img (4).jpg', category: 'Personal Care', price: 34.99 },
    { name: 'Hair Dryer', image: '/images/img (5).jpg', category: 'Personal Care', price: 39.99 },
    { name: 'Dehumidifier', image: '/images/img (6).jpg', category: 'Home Appliances', price: 79.99 },
    { name: 'Pressure Cooker', image: '/images/img (7).jpg', category: 'Kitchen', price: 69.99 },
    { name: 'Electric Shaver', image: '/images/img (8).jpg', category: 'Personal Care', price: 44.99 }
];

import { useProfile } from '@/lib/hooks/useAuth';

export default function Header() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(trendingProducts);
    const searchRef = useRef<HTMLDivElement>(null);
    const { data: profile } = useProfile();

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/shop', label: 'Shop' },
        { href: '/bestsellers', label: 'Bestsellers' },
        { href: '/deals', label: 'Deals' },
        { href: '/about', label: 'About' }
    ];

    // Filter products based on search query
    useEffect(() => {
        if (searchQuery.trim()) {
            const filtered = trendingProducts.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(trendingProducts);
        }
    }, [searchQuery]);

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-8 h-8 relative">
                            <Image
                                src="/logo.png"
                                alt="Distress"
                                width={32}
                                height={32}
                                className="object-contain"
                            />
                        </div>
                        <motion.span
                            className="text-2xl font-bold text-gray-900 hidden sm:block"
                            whileHover={{ scale: 1.05 }}
                        >
                            Distress
                        </motion.span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-700 hover:text-teal-600 font-medium transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-xl mx-4 relative" ref={searchRef}>
                        <form onSubmit={handleSearch}>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchOpen(true)}
                                    className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <button
                                    type="submit"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-gray-900 hover:bg-gray-800 text-white rounded-full transition-colors"
                                >
                                    <Search className="w-4 h-4" />
                                </button>
                            </div>
                        </form>

                        {/* Search Dropdown */}
                        <AnimatePresence>
                            {isSearchOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-[600px] overflow-y-auto"
                                >
                                    <div className="p-4">
                                        {/* Discover More Section */}
                                        <div className="mb-4">
                                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Discover more</h3>
                                            <div className="space-y-1">
                                                {searchCategories.map((category) => (
                                                    <Link
                                                        key={category.name}
                                                        href={category.href}
                                                        onClick={() => setIsSearchOpen(false)}
                                                        className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors group"
                                                    >
                                                        <category.icon className="w-5 h-5 text-gray-600 group-hover:text-teal-600 transition-colors" />
                                                        <span className="text-sm text-gray-700 group-hover:text-teal-600 transition-colors">{category.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Trending Products */}
                                        <div className="border-t border-gray-100 pt-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-sm font-semibold text-gray-900">
                                                    {searchQuery ? 'Search Results' : 'Trending Products'}
                                                </h3>
                                                <Link
                                                    href="/shop"
                                                    onClick={() => setIsSearchOpen(false)}
                                                    className="text-xs text-teal-600 hover:text-teal-700 flex items-center gap-1"
                                                >
                                                    Other recommendations
                                                    <TrendingUp className="w-3 h-3" />
                                                </Link>
                                            </div>

                                            {filteredProducts.length > 0 ? (
                                                <div className="grid grid-cols-4 gap-3">
                                                    {filteredProducts.slice(0, 8).map((product, index) => (
                                                        <Link
                                                            key={index}
                                                            href={`/products/${index + 1}`}
                                                            onClick={() => setIsSearchOpen(false)}
                                                            className="group"
                                                        >
                                                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                                                                <Image
                                                                    src={product.image}
                                                                    alt={product.name}
                                                                    width={120}
                                                                    height={120}
                                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                                />
                                                            </div>
                                                            <p className="text-xs text-gray-900 font-medium line-clamp-1">{product.name}</p>
                                                            <p className="text-xs text-gray-500">{product.category}</p>
                                                            <p className="text-xs font-bold text-teal-600">${product.price}</p>
                                                        </Link>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-8">
                                                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                                    <p className="text-sm text-gray-600 mb-2">No products found for "{searchQuery}"</p>
                                                    <Link
                                                        href={`/search?q=${encodeURIComponent(searchQuery)}`}
                                                        onClick={() => setIsSearchOpen(false)}
                                                        className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                                                    >
                                                        View all search results →
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ShoppingCart className="w-5 h-5 text-gray-700" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center">
                                0
                            </span>
                        </Link>
                        {profile ? (
                            <Link href="/dashboard" className="hidden md:flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full transition-colors">
                                <User className="w-4 h-4" />
                                <span className="text-sm font-medium">Dashboard</span>
                            </Link>
                        ) : (
                            <Link href="/signin" className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-full transition-colors">
                                <User className="w-4 h-4" />
                                <span className="text-sm font-medium">Sign In</span>
                            </Link>
                        )}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-gray-100 py-4"
                        >
                            <nav className="flex flex-col space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                {profile ? (
                                    <Link
                                        href="/dashboard"
                                        className="mx-4 mt-2 px-4 py-2 bg-teal-600 text-white text-center rounded-full"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href="/signin"
                                        className="mx-4 mt-2 px-4 py-2 bg-gray-900 text-white text-center rounded-full"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                )}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
