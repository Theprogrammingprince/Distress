'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Phone, MapPin, FileText, Fingerprint, Building2 } from 'lucide-react';
import Link from 'next/link';
import { useSignUp } from '@/lib/hooks/useAuth';
import toast from 'react-hot-toast';

type UserType = 'buyer' | 'client' | null;

export default function SignUpPage() {
    const router = useRouter();
    const signUp = useSignUp();
    const [showPassword, setShowPassword] = useState(false);
    const [userType, setUserType] = useState<UserType>(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        nin: '',
        streetAddress: '',
        city: '',
        state: '',
        businessName: '',
        businessRegNumber: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Show loading toast
        const loadingToast = toast.loading('Creating your account...');

        try {
            const result = await signUp.mutateAsync({
                email: formData.email,
                password: formData.password,
                full_name: formData.fullName,
                phone: formData.phone,
                role: userType || 'buyer',
            });

            // Dismiss loading
            toast.dismiss(loadingToast);

            if (result.session) {
                // Auto-confirmed (Email verification disabled)
                toast.success(`🎉 Welcome to Distress! Your ${userType} account has been created successfully!`, {
                    duration: 5000,
                });

                // Redirect immediately to dashboard
                router.push('/dashboard');
            } else {
                // Email verification required
                toast.success('Account created! Please check your email to confirm your account.', {
                    duration: 5000,
                });

                // Redirect to signin
                setTimeout(() => {
                    router.push('/signin');
                }, 2000);
            }
        } catch (error: any) {
            // Dismiss loading and show error
            toast.dismiss(loadingToast);
            toast.error(error.message || 'Failed to create account. Please try again.', {
                duration: 5000,
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        Create <span className="italic font-light">Account</span>
                    </h1>
                    <p className="text-gray-600">Join Distress and start saving today</p>
                </div>

                {/* User Type Selection */}
                {!userType && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-8 shadow-lg"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-center">I want to sign up as a:</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.button
                                onClick={() => setUserType('buyer')}
                                className="p-8 border-2 border-gray-200 rounded-2xl hover:border-teal-600 hover:bg-teal-50 transition-all group"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <User className="w-12 h-12 text-gray-400 group-hover:text-teal-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Buyer</h3>
                                <p className="text-sm text-gray-600">Shop premium products at distress prices</p>
                            </motion.button>

                            <motion.button
                                onClick={() => setUserType('client')}
                                className="p-8 border-2 border-gray-200 rounded-2xl hover:border-teal-600 hover:bg-teal-50 transition-all group"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Building2 className="w-12 h-12 text-gray-400 group-hover:text-teal-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Client/Seller</h3>
                                <p className="text-sm text-gray-600">Sell your products on our platform</p>
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* Registration Form */}
                <AnimatePresence mode="wait">
                    {userType && (
                        <motion.div
                            key={userType}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl md:text-2xl font-bold">
                                    {userType === 'buyer' ? 'Buyer' : 'Client/Seller'} Registration
                                </h2>
                                <button
                                    onClick={() => setUserType(null)}
                                    className="text-sm text-gray-600 hover:text-gray-900"
                                >
                                    ← Change
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                {/* Basic Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                placeholder="John Doe"
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="you@example.com"
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="+234 800 000 0000"
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Password *
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                placeholder="••••••••"
                                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Client-specific fields */}
                                {userType === 'client' && (
                                    <>
                                        <div className="border-t pt-6">
                                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                                <Fingerprint className="w-5 h-5 text-teal-600" />
                                                Verification Information
                                            </h3>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Nigerian NIN (National Identification Number) *
                                                    </label>
                                                    <div className="relative">
                                                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            value={formData.nin}
                                                            onChange={(e) => setFormData({ ...formData, nin: e.target.value })}
                                                            placeholder="12345678901"
                                                            maxLength={11}
                                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                            required
                                                        />
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1">11-digit National Identification Number</p>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Street Address *
                                                    </label>
                                                    <div className="relative">
                                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            value={formData.streetAddress}
                                                            onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                                                            placeholder="123 Main Street"
                                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            City *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={formData.city}
                                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                            placeholder="Lagos"
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                            required
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            State *
                                                        </label>
                                                        <select
                                                            value={formData.state}
                                                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                            required
                                                        >
                                                            <option value="">Select State</option>
                                                            <option value="Lagos">Lagos</option>
                                                            <option value="Abuja">Abuja (FCT)</option>
                                                            <option value="Kano">Kano</option>
                                                            <option value="Rivers">Rivers</option>
                                                            <option value="Oyo">Oyo</option>
                                                            {/* Add more Nigerian states */}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Business Name (Optional)
                                                    </label>
                                                    <div className="relative">
                                                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            value={formData.businessName}
                                                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                                            placeholder="Your Business Name"
                                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Business Registration Number (Optional)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.businessRegNumber}
                                                        onChange={(e) => setFormData({ ...formData, businessRegNumber: e.target.value })}
                                                        placeholder="RC123456"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                    />
                                                </div>

                                                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                                                    <p className="text-sm text-amber-800">
                                                        <strong>Note:</strong> Additional verification documents (biometric data, business documents) will be required after registration to complete your seller account setup.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="flex items-start gap-2 pt-4">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="mt-1 w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                                        required
                                    />
                                    <label htmlFor="terms" className="text-sm text-gray-600">
                                        I agree to the{' '}
                                        <Link href="/terms" className="text-teal-600 hover:text-teal-700 font-semibold">
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link href="/privacy" className="text-teal-600 hover:text-teal-700 font-semibold">
                                            Privacy Policy
                                        </Link>
                                    </label>
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={signUp.isPending}
                                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-full font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {signUp.isPending ? 'Creating Account...' : `Create ${userType === 'buyer' ? 'Buyer' : 'Seller'} Account`}
                                </motion.button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-gray-600 text-sm md:text-base">
                                    Already have an account?{' '}
                                    <Link href="/signin" className="text-teal-600 hover:text-teal-700 font-semibold">
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
