'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Search, TrendingUp, Star, ShoppingCart, Heart, Sparkles, Tag, Zap, Sofa, Smartphone, Home as HomeIcon, UtensilsCrossed } from 'lucide-react';

// Mock product database
const allProducts = [
    { id: 1, name: 'Modern Velvet Sofa', price: 299.99, rating: 4.8, reviews: 234, image: '/images/img (3).jpg', category: 'Furniture', badge: 'Trending' },
    { id: 2, name: 'Smart Air Purifier Pro', price: 89.99, rating: 4.9, reviews: 456, image: '/images/img (1).jpg', category: 'Electronics', badge: 'Best Seller' },
    { id: 3, name: 'Ultrasonic Humidifier', price: 49.99, rating: 4.7, reviews: 189, image: '/images/img (2).jpg', category: 'Home Appliances', badge: 'New' },
    { id: 4, name: 'Professional Hair Dryer', price: 39.99, rating: 4.6, reviews: 312, image: '/images/img (5).jpg', category: 'Personal Care', badge: 'Hot' },
    { id: 5, name: 'Electric Pressure Cooker', price: 69.99, rating: 4.8, reviews: 278, image: '/images/img (7).jpg', category: 'Kitchen', badge: 'Trending' },
    { id: 6, name: 'Rotating Hair Brush', price: 34.99, rating: 4.5, reviews: 156, image: '/images/img (4).jpg', category: 'Personal Care', badge: 'Sale' },
    { id: 7, name: 'Premium Dehumidifier', price: 79.99, rating: 4.7, reviews: 201, image: '/images/img (6).jpg', category: 'Home Appliances', badge: 'New' },
    { id: 8, name: 'Electric Shaver Set', price: 44.99, rating: 4.6, reviews: 167, image: '/images/img (8).jpg', category: 'Personal Care', badge: 'Hot' },
];

const suggestedCategories = [
    { name: 'Furniture', icon: Sofa, href: '/shop?category=furniture' },
    { name: 'Electronics', icon: Smartphone, href: '/shop?category=electronics' },
    { name: 'Home Decor', icon: HomeIcon, href: '/shop?category=home-decor' },
    { name: 'Kitchen', icon: UtensilsCrossed, href: '/shop?category=kitchen' },
];

const badgeColors: { [key: string]: string } = {
    'Trending': 'bg-purple-500',
    'Best Seller': 'bg-amber-500',
    'New': 'bg-green-500',
    'Hot': 'bg-red-500',
    'Sale': 'bg-blue-500',
};

export default function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    // Filter products based on search query
    const searchResults = allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );

    const hasResults = searchResults.length > 0;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Search Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        {hasResults ? 'Search Results' : 'No Results Found'}
                    </h1>
                    <p className="text-gray-600">
                        {hasResults
                            ? `Found ${searchResults.length} ${searchResults.length === 1 ? 'result' : 'results'} for "${query}"`
                            : `We couldn't find any products matching "${query}"`
                        }
                    </p>
                </motion.div>

                {hasResults ? (
                    /* Results Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {searchResults.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                                    {/* Image Container */}
                                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                                        <Link href={`/products/${product.id}`}>
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </Link>

                                        {/* Badge */}
                                        <div className={`absolute top-3 left-3 ${badgeColors[product.badge]} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                                            {product.badge}
                                        </div>

                                        {/* Wishlist Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                                        >
                                            <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                                        </motion.button>

                                        {/* Quick Add to Cart */}
                                        <motion.button
                                            initial={{ opacity: 0, y: 20 }}
                                            whileHover={{ opacity: 1, y: 0 }}
                                            className="absolute bottom-3 left-3 right-3 py-2.5 bg-gray-900 text-white rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            Quick Add
                                        </motion.button>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-4">
                                        <Link href={`/products/${product.id}`}>
                                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-teal-600 transition-colors">
                                                {product.name}
                                            </h3>
                                        </Link>

                                        {/* Rating */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < Math.floor(product.rating)
                                                            ? 'text-amber-400 fill-amber-400'
                                                            : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                {product.rating} ({product.reviews})
                                            </span>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="p-2 bg-teal-50 hover:bg-teal-100 rounded-full transition-colors"
                                            >
                                                <ShoppingCart className="w-5 h-5 text-teal-600" />
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    /* No Results State */
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-3xl p-12 text-center shadow-lg"
                        >
                            {/* Illustration */}
                            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center">
                                <Search className="w-16 h-16 text-teal-600" />
                            </div>

                            {/* Message */}
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                                Oops! Nothing Found
                            </h2>
                            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                We couldn't find any products matching your search. Try different keywords or browse our categories below.
                            </p>

                            {/* Suggested Categories */}
                            <div className="mb-8">
                                <h3 className="font-semibold text-gray-900 mb-4">Browse Popular Categories</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {suggestedCategories.map((category) => {
                                        const IconComponent = category.icon;
                                        return (
                                            <Link
                                                key={category.name}
                                                href={category.href}
                                                className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-teal-50 hover:to-teal-100 rounded-xl transition-all group"
                                            >
                                                <IconComponent className="w-10 h-10 mb-2 text-gray-700 group-hover:text-teal-600 transition-colors" />
                                                <p className="font-medium text-gray-900 group-hover:text-teal-600 transition-colors">
                                                    {category.name}
                                                </p>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/shop"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-semibold transition-colors"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Browse All Products
                                </Link>
                                <Link
                                    href="/deals"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-semibold transition-colors"
                                >
                                    <Zap className="w-5 h-5" />
                                    View Hot Deals
                                </Link>
                            </div>
                        </motion.div>

                        {/* Trending Products Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-12"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-gray-900">You Might Like</h3>
                                <Link href="/shop" className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1">
                                    View All
                                    <TrendingUp className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {allProducts.slice(0, 4).map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                    >
                                        <Link href={`/products/${product.id}`}>
                                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                                                <div className="relative aspect-square overflow-hidden bg-gray-100">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    <div className={`absolute top-3 left-3 ${badgeColors[product.badge]} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                                                        {product.badge}
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h4>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xl font-bold text-gray-900">${product.price}</span>
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                                            <span className="text-sm text-gray-600">{product.rating}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}
