'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/lib/products';
import { useWishlist } from '@/app/context/WishlistContext';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    const toggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };


    return (
        <motion.div
            className="group relative bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0 w-[280px]"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
        >
            {/* Badge */}
            {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
                        {product.badge}
                    </span>
                </div>
            )}

            <button
                onClick={toggleWishlist}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors"
            >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'fill-transparent'}`} />
            </button>

            {/* Product Image */}
            <Link href={`/products/${product.id}`}>
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
            </Link>

            {/* Product Info */}
            <div className="p-5 bg-white">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < product.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-gray-200 text-gray-200'
                                }`}
                        />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                </div>

                {/* Product Name */}
                <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 hover:text-gray-600 transition-colors">
                        {product.name}
                    </h3>
                </Link>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                </p>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xl font-bold text-gray-900">${product.price}</p>
                        {product.originalPrice && (
                            <p className="text-xs text-gray-400 line-through">
                                ${product.originalPrice}
                            </p>
                        )}
                    </div>
                    <motion.button
                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Add
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
