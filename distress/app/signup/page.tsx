'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Building2 } from 'lucide-react';
import { useSignUp } from '@/lib/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';
import Link from 'next/link';
import BuyerSignupForm from './BuyerSignupForm';
import SellerSignupSteps from './SellerSignupSteps';

type UserType = 'buyer' | 'client' | null;

export default function SignUpPage() {
    const router = useRouter();
    const signUp = useSignUp();
    const [userType, setUserType] = useState<UserType>(null);

    const handleSellerSubmit = async (formData: any) => {
        const loadingToast = toast.loading('Creating your seller account...');

        try {
            // 1. Upload profile picture if provided
            let avatarUrl = '';
            if (formData.profilePicture) {
                const fileExt = formData.profilePicture.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `avatars/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('profiles')
                    .upload(filePath, formData.profilePicture);

                if (uploadError) {
                    console.error('Upload error:', uploadError);
                } else {
                    const { data: { publicUrl } } = supabase.storage
                        .from('profiles')
                        .getPublicUrl(filePath);
                    avatarUrl = publicUrl;
                }
            }

            // 2. Create account with all data
            const result = await signUp.mutateAsync({
                email: formData.email,
                password: formData.password,
                full_name: formData.fullName,
                phone: formData.phone,
                role: 'client',
                nin: formData.nin,
                business_name: formData.businessName,
                business_reg_number: formData.businessRegNumber,
                street_address: formData.streetAddress,
                city: formData.city,
                state: formData.state,
                avatar_url: avatarUrl,
            });

            toast.dismiss(loadingToast);

            if (result.session) {
                toast.success('🎉 Account created successfully!', {
                    duration: 3000,
                });

                setTimeout(() => {
                    toast(
                        '⏳ Your account is under review. You will not be able to create products until your profile is verified by our admin team. This usually takes 24-48 hours.',
                        {
                            duration: 8000,
                            icon: '📋',
                            style: {
                                background: '#FEF3C7',
                                color: '#92400E',
                                border: '1px solid #F59E0B',
                            },
                        }
                    );
                }, 500);

                setTimeout(() => {
                    router.push('/dashboard');
                }, 1000);
            } else {
                toast.success('Account created! Please check your email to confirm your account.', {
                    duration: 5000,
                });
            }
        } catch (error: any) {
            toast.dismiss(loadingToast);
            toast.error(error.message || 'Failed to create account. Please try again.', {
                duration: 5000,
            });
        }
    };

    const handleBuyerSubmit = async (formData: any) => {
        const loadingToast = toast.loading('Creating your account...');

        try {
            const result = await signUp.mutateAsync({
                email: formData.email,
                password: formData.password,
                full_name: formData.fullName,
                phone: formData.phone,
                role: 'buyer',
            });

            toast.dismiss(loadingToast);

            if (result.session) {
                toast.success('🎉 Welcome to Distress! Your buyer account has been created successfully!', {
                    duration: 5000,
                });

                setTimeout(() => {
                    router.push('/dashboard');
                }, 1000);
            } else {
                toast.success('Account created! Please check your email to confirm your account.', {
                    duration: 5000,
                });
            }
        } catch (error: any) {
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
                                <h3 className="text-xl font-bold mb-2">Seller</h3>
                                <p className="text-sm text-gray-600">Sell your products to thousands of customers</p>
                            </motion.button>
                        </div>

                        <div className="mt-6 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link href="/signin" className="text-teal-600 hover:underline font-medium">
                                Sign in
                            </Link>
                        </div>
                    </motion.div>
                )}

                {/* Buyer Simple Form */}
                {userType === 'buyer' && (
                    <BuyerSignupForm
                        onSubmit={handleBuyerSubmit}
                        onBack={() => setUserType(null)}
                        isLoading={signUp.isPending}
                    />
                )}

                {/* Seller Multi-Step Form */}
                {userType === 'client' && (
                    <SellerSignupSteps
                        onSubmit={handleSellerSubmit}
                        onBack={() => setUserType(null)}
                        isLoading={signUp.isPending}
                    />
                )}
            </motion.div>
        </div>
    );
}
