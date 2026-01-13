'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Upload, X, Check, AlertCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useProfile } from '@/lib/hooks/useAuth';
import toast from 'react-hot-toast';

interface ProductFormData {
    name: string;
    category: string;
    brand: string;
    weight: string;
    gender: string;
    description: string;
    originalPrice: string;
    discountPrice: string;
    stock: string;
}

export default function CreateProductPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: profile } = useProfile();

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        category: '',
        brand: '',
        weight: '',
        gender: '',
        description: '',
        originalPrice: '',
        discountPrice: '',
        stock: ''
    });

    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
    const colors = [
        { name: 'Red', hex: '#FF6B6B' },
        { name: 'Yellow', hex: '#FFD93D' },
        { name: 'Green', hex: '#6BCF7F' },
        { name: 'Blue', hex: '#4D96FF' },
        { name: 'Purple', hex: '#A78BFA' },
        { name: 'Pink', hex: '#F472B6' },
        { name: 'Black', hex: '#000000' },
        { name: 'White', hex: '#FFFFFF' },
    ];

    const categories = [
        { value: 'electronics', label: 'Electronics' },
        { value: 'clothing', label: 'Clothing & Fashion' },
        { value: 'furniture', label: 'Furniture' },
        { value: 'home-decor', label: 'Home & Decor' },
        { value: 'accessories', label: 'Accessories' },
        { value: 'shoes', label: 'Shoes & Footwear' },
        { value: 'beauty', label: 'Beauty & Personal Care' },
        { value: 'sports', label: 'Sports & Outdoors' },
        { value: 'books', label: 'Books & Media' },
        { value: 'toys', label: 'Toys & Games' },
    ];

    const toggleSize = (size: string) => {
        setSelectedSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    const toggleColor = (hex: string) => {
        setSelectedColors(prev =>
            prev.includes(hex) ? prev.filter(c => c !== hex) : [...prev, hex]
        );
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image must be less than 5MB');
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
    };

    const handleInputChange = (field: keyof ProductFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateForm = (): boolean => {
        if (!formData.name.trim()) {
            toast.error('Product name is required');
            return false;
        }
        if (!formData.category) {
            toast.error('Please select a category');
            return false;
        }
        if (!formData.discountPrice || parseFloat(formData.discountPrice) <= 0) {
            toast.error('Please enter a valid selling price');
            return false;
        }
        if (!formData.description.trim()) {
            toast.error('Product description is required');
            return false;
        }
        if (!imageFile) {
            toast.error('Please upload a product image');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        if (!profile?.id) {
            toast.error('You must be logged in to create products');
            return;
        }

        // Check if seller is verified
        if (profile.verification_status !== 'approved') {
            toast.error('Your seller account must be verified before you can create products');
            return;
        }

        setIsSubmitting(true);
        const loadingToast = toast.loading('Creating product...');

        try {
            // 1. Upload image to Supabase Storage
            let imageUrl = '';
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${profile.id}-${Date.now()}.${fileExt}`;
                const filePath = `products/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('products')
                    .upload(filePath, imageFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('products')
                    .getPublicUrl(filePath);

                imageUrl = publicUrl;
            }

            // 2. Create product in database
            const productData = {
                name: formData.name.trim(),
                description: formData.description.trim(),
                price: parseFloat(formData.discountPrice),
                category: formData.category,
                image_url: imageUrl,
                stock: parseInt(formData.stock) || 0,
                seller_id: profile.id,
                verification_status: 'pending',
                badge: formData.originalPrice && parseFloat(formData.originalPrice) > parseFloat(formData.discountPrice)
                    ? `${Math.round((1 - parseFloat(formData.discountPrice) / parseFloat(formData.originalPrice)) * 100)}% OFF`
                    : null,
            };

            const { error: insertError } = await supabase
                .from('products')
                .insert(productData);

            if (insertError) throw insertError;

            toast.dismiss(loadingToast);
            setShowSuccessModal(true);

            // Invalidate products cache
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['sellerProducts'] });

        } catch (error: any) {
            toast.dismiss(loadingToast);
            toast.error(error.message || 'Failed to create product');
        } finally {
            setIsSubmitting(false);
        }
    };

    const displayPrice = formData.discountPrice ? parseFloat(formData.discountPrice).toLocaleString() : '0';
    const displayOriginalPrice = formData.originalPrice ? parseFloat(formData.originalPrice).toLocaleString() : '';

    return (
        <div className="dark:bg-gray-900 min-h-screen">
            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center"
                    >
                        <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="w-8 h-8 text-amber-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Product Submitted!
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Your product has been submitted for review. Our team will verify it within 24-48 hours. You'll receive a notification when it's approved.
                        </p>
                        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                                <p className="text-sm text-amber-800 dark:text-amber-300 text-left">
                                    Your product will not be visible to buyers until it has been approved by our admin team.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowSuccessModal(false);
                                    router.push('/dashboard/products/grid');
                                }}
                                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                            >
                                View My Products
                            </button>
                            <button
                                onClick={() => {
                                    setShowSuccessModal(false);
                                    // Reset form
                                    setFormData({
                                        name: '',
                                        category: '',
                                        brand: '',
                                        weight: '',
                                        gender: '',
                                        description: '',
                                        originalPrice: '',
                                        discountPrice: '',
                                        stock: ''
                                    });
                                    setImageFile(null);
                                    setImagePreview(null);
                                    setSelectedSizes([]);
                                    setSelectedColors([]);
                                }}
                                className="flex-1 px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors font-medium"
                            >
                                Create Another
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Create Product</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Add a new product for review and approval</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Product Preview */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 sticky top-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Preview</h3>

                        {/* Product Image */}
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl aspect-square mb-4 overflow-hidden relative">
                            {imagePreview ? (
                                <>
                                    <Image
                                        src={imagePreview}
                                        alt="Product preview"
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Upload className="w-12 h-12 text-gray-400" />
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                            {formData.name || 'Product Name'}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                            {formData.description || 'Product description will appear here...'}
                        </p>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-xl font-bold text-gray-900 dark:text-white">₦{displayPrice}</span>
                            {displayOriginalPrice && parseFloat(formData.originalPrice) > parseFloat(formData.discountPrice) && (
                                <span className="text-sm text-gray-400 line-through">₦{displayOriginalPrice}</span>
                            )}
                        </div>

                        {/* Size Selection Preview */}
                        {selectedSizes.length > 0 && (
                            <div className="mb-4">
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Available Sizes:</p>
                                <div className="flex flex-wrap gap-1">
                                    {selectedSizes.map((size) => (
                                        <span key={size} className="px-2 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-xs rounded">
                                            {size}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Color Selection Preview */}
                        {selectedColors.length > 0 && (
                            <div className="mb-6">
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Available Colors:</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedColors.map((color) => (
                                        <div
                                            key={color}
                                            className="w-6 h-6 rounded-full border-2 border-gray-200 dark:border-gray-600"
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Status Badge */}
                        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 mb-4">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-amber-600" />
                                <span className="text-sm text-amber-800 dark:text-amber-300 font-medium">Pending Review</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => router.back()}
                                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit for Review'
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Product Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Thumbnail Upload */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Product Image *</h3>

                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-12 text-center hover:border-teal-400 dark:hover:border-teal-500 transition-colors">
                            <input
                                type="file"
                                id="thumbnail"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            <label htmlFor="thumbnail" className="cursor-pointer">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                        <Upload className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById('thumbnail')?.click()}
                                        className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg mb-3 text-sm font-medium transition-colors"
                                    >
                                        Upload Image
                                    </button>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                        Drop your image here, or click to browse
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        PNG, JPG, WEBP (Max 5MB)
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Pricing</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Original Price (₦)
                                </label>
                                <input
                                    type="number"
                                    value={formData.originalPrice}
                                    onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                                    placeholder="e.g. 50000"
                                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                                <p className="text-xs text-gray-400 mt-1">Optional - for showing discounts</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Selling Price (₦) *
                                </label>
                                <input
                                    type="number"
                                    value={formData.discountPrice}
                                    onChange={(e) => handleInputChange('discountPrice', e.target.value)}
                                    placeholder="e.g. 35000"
                                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    required
                                />
                                <p className="text-xs text-gray-400 mt-1">The price buyers will pay</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Stock Quantity
                                </label>
                                <input
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => handleInputChange('stock', e.target.value)}
                                    placeholder="e.g. 50"
                                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                                <p className="text-xs text-gray-400 mt-1">Available units</p>
                            </div>
                        </div>
                    </div>

                    {/* Product Information */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Product Information</h3>

                        <div className="space-y-4">
                            {/* Product Name & Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Product Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        placeholder="e.g. Premium Wireless Headphones"
                                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Category *
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((cat) => (
                                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Brand & Weight */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Brand
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.brand}
                                        onChange={(e) => handleInputChange('brand', e.target.value)}
                                        placeholder="e.g. Sony, Nike, Samsung"
                                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Weight
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.weight}
                                        onChange={(e) => handleInputChange('weight', e.target.value)}
                                        placeholder="e.g. 500g, 2kg"
                                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Available Sizes (optional)
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => toggleSize(size)}
                                            className={`px-5 py-2 rounded-lg border text-sm font-medium transition-colors ${selectedSizes.includes(size)
                                                ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400'
                                                : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Available Colors (optional)
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {colors.map((color) => (
                                        <button
                                            key={color.hex}
                                            type="button"
                                            onClick={() => toggleColor(color.hex)}
                                            className={`w-10 h-10 rounded-lg border-2 transition-all flex items-center justify-center ${selectedColors.includes(color.hex)
                                                ? 'border-gray-900 dark:border-white scale-110'
                                                : 'border-gray-200 dark:border-gray-600'
                                                }`}
                                            style={{ backgroundColor: color.hex }}
                                            title={color.name}
                                        >
                                            {selectedColors.includes(color.hex) && (
                                                <Check className={`w-4 h-4 ${color.hex === '#FFFFFF' || color.hex === '#FFD93D' ? 'text-gray-900' : 'text-white'}`} />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    placeholder="Describe your product in detail. Include key features, materials, dimensions, etc."
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button (Mobile) */}
                    <div className="lg:hidden">
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors font-medium flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                'Submit for Review'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
