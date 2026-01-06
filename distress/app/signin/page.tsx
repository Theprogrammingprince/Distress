'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useSignIn } from '@/lib/hooks/useAuth';
import toast from 'react-hot-toast';

export default function SignInPage() {
    const router = useRouter();
    const signIn = useSignIn();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Show loading toast
        const loadingToast = toast.loading('Signing you in...');

        try {
            await signIn.mutateAsync(formData);

            // Dismiss loading and show success
            toast.dismiss(loadingToast);
            toast.success('Welcome back! You are now signed in. 🎉', {
                duration: 3000,
            });

            // Redirect after success
            setTimeout(() => {
                router.push('/dashboard');
            }, 1500);
        } catch (error: any) {
            // Dismiss loading and show error
            toast.dismiss(loadingToast);
            toast.error(error.message || 'Invalid email or password. Please try again.', {
                duration: 5000,
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
            >
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2">
                        Welcome <span className="italic font-light">Back</span>
                    </h1>
                    <p className="text-gray-600">Sign in to continue shopping</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
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

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
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

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="text-sm text-teal-600 hover:text-teal-700">
                                Forgot password?
                            </Link>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={signIn.isPending}
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-full font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {signIn.isPending ? 'Signing In...' : 'Sign In'}
                        </motion.button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-teal-600 hover:text-teal-700 font-semibold">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
