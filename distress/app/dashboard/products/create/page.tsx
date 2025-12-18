'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/app/context/ProductsContext';
import { Upload } from 'lucide-react';
import Image from 'next/image';

export default function CreateProductPage() {
    const router = useRouter();
    const { addProduct } = useProducts();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedSizes, setSelectedSizes] = useState<string[]>(['XS']);
    const [selectedColors, setSelectedColors] = useState<string[]>(['#FF6B6B']);
    const [formData, setFormData] = useState({
        productName: '',
        category: '',
        brand: '',
        weight: '',
        gender: '',
        description: '',
        price: ''
    });

    const sizes = ['XS', 'S', 'M', 'Xl', 'XXL', '3XL'];
    const colors = [
        '#FF6B6B', // Red
        '#FFD93D', // Yellow
        '#6BCF7F', // Green
        '#4D96FF', // Blue
        '#A78BFA', // Purple
        '#C084FC', // Light Purple
        '#000000'  // Black
    ];

    const toggleSize = (size: string) => {
        setSelectedSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    const toggleColor = (color: string) => {
        setSelectedColors(prev =>
            prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
        );
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreate = () => {
        if (!formData.productName || !formData.price) {
            alert('Please fill in required fields');
            return;
        }

        addProduct({
            name: formData.productName,
            description: formData.description,
            price: parseFloat(formData.price),
            image: selectedImage || '/images/img (1).jpg', // Fallback image
            category: formData.category || 'Uncategorized',
            rating: 0,
            reviews: 0,
            inStock: true,
            // badge: 'New'
        });

        router.push('/dashboard/products');
    };

    return (
        <div>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Product</h1>
                <p className="text-sm text-gray-500">View and manage all listed products easily</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Product Preview */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        {/* Product Image */}
                        <div className="bg-gray-100 rounded-2xl aspect-square mb-4 overflow-hidden">
                            {selectedImage ? (
                                <Image
                                    src={selectedImage}
                                    alt="Product preview"
                                    width={300}
                                    height={300}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Upload className="w-12 h-12 text-gray-400" />
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <h3 className="font-semibold text-gray-900 mb-1">
                            {formData.productName || 'Japan Green Outer'}
                        </h3>
                        <p className="text-xs text-gray-500 mb-3">
                            Soft silk, 60cm blend brand polo with branded striped Insole for daily confidence
                        </p>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-xl font-bold text-gray-900">${formData.price || '0.00'}</span>
                        </div>

                        {/* Size Selection */}
                        <div className="mb-4">
                            <p className="text-xs text-gray-600 mb-2">Size :</p>
                            <div className="flex gap-2">
                                {['XS', 'S', 'M'].map((size) => (
                                    <button
                                        key={size}
                                        className={`w-10 h-10 rounded-lg border text-sm font-medium transition-colors ${selectedSizes.includes(size)
                                            ? 'border-teal-600 bg-teal-50 text-teal-600'
                                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className="mb-6">
                            <p className="text-xs text-gray-600 mb-2">Colors :</p>
                            <div className="flex gap-2">
                                {colors.slice(0, 6).map((color) => (
                                    <button
                                        key={color}
                                        className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColors.includes(color)
                                            ? 'border-gray-900 scale-110'
                                            : 'border-transparent'
                                            }`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => router.back()}
                                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreate}
                                className="flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors text-sm font-medium"
                            >
                                Create Product
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Product Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Thumbnail Upload */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-4">Add Thumbnail Photo</h3>

                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
                            <input
                                type="file"
                                id="thumbnail"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            <label htmlFor="thumbnail" className="cursor-pointer">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <Upload className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById('thumbnail')?.click()}
                                        className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg mb-3 text-sm font-medium transition-colors"
                                    >
                                        Upload
                                    </button>
                                    <p className="text-sm text-gray-600 mb-1">
                                        Drop your images here, or click to browse
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Product Information */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-6">Product Information</h3>

                        <div className="space-y-4">
                            {/* Product Name & Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.productName}
                                        onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                        placeholder="Items Name"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Categories
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-500"
                                    >
                                        <option value="">Choose a categories</option>
                                        <option value="Furniture">Furniture</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Clothing">Clothing</option>
                                        <option value="Home Decor">Home Decor</option>
                                    </select>
                                </div>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="0.00"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                            </div>

                            {/* Brand, Weight & Gender */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Brand
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.brand}
                                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                        placeholder="Brand Name"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Weight
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.weight}
                                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                        placeholder="Gm & kg"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gender
                                    </label>
                                    <select
                                        value={formData.gender}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-500"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="unisex">Unisex</option>
                                    </select>
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Size :
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => toggleSize(size)}
                                            className={`px-6 py-2.5 rounded-lg border text-sm font-medium transition-colors ${selectedSizes.includes(size)
                                                ? 'border-teal-600 bg-teal-50 text-teal-600'
                                                : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Colors :
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {colors.map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => toggleColor(color)}
                                            className={`w-10 h-10 rounded-lg border-2 transition-all ${selectedColors.includes(color)
                                                ? 'border-gray-900 scale-110'
                                                : 'border-gray-200'
                                                }`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Short description about the product"
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
