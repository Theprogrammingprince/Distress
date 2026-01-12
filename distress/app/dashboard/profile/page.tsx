'use client';

import { useState, useEffect } from 'react';
import {
    User, Mail, Phone, MapPin, Save, Camera, Building2, FileText,
    CheckCircle, Clock, XCircle, Shield, CreditCard
} from 'lucide-react';
import { useProfile } from '@/lib/hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserProfile } from '@/lib/api/users';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ProfilePage() {
    const { data: profile, isLoading } = useProfile();
    const queryClient = useQueryClient();
    const isSeller = profile?.role === 'client' || profile?.role === 'seller';

    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                full_name: profile.full_name || '',
                phone: profile.phone || '',
            });
        }
    }, [profile]);

    const updateProfile = useMutation({
        mutationFn: updateUserProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            toast.success('Profile updated successfully!');
        },
        onError: () => {
            toast.error('Failed to update profile');
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const loadingToast = toast.loading('Updating profile...');

        updateProfile.mutate({
            full_name: formData.full_name,
            phone: formData.phone,
        }, {
            onSettled: () => toast.dismiss(loadingToast)
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const getVerificationBadge = () => {
        if (!isSeller) return null;

        switch (profile?.verification_status) {
            case 'approved':
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
                        <CheckCircle className="w-4 h-4" />
                        Verified
                    </span>
                );
            case 'pending':
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full">
                        <Clock className="w-4 h-4" />
                        Pending Verification
                    </span>
                );
            case 'rejected':
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full">
                        <XCircle className="w-4 h-4" />
                        Rejected
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">My Profile</h1>
                <p className="text-gray-600 dark:text-gray-400">View and manage your account information</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Summary Card */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Profile Picture & Basic Info */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                            <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                                {profile?.full_name?.substring(0, 2).toUpperCase() || 'US'}
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-700 text-teal-600 dark:text-teal-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-md border border-gray-200 dark:border-gray-600">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {profile?.full_name || 'User Name'}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mb-3">
                            {profile?.role === 'client' ? 'Seller' : profile?.role || 'Buyer'}
                        </p>
                        {getVerificationBadge()}
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-left space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600 dark:text-gray-400 truncate">{profile?.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600 dark:text-gray-400">{profile?.phone || 'Not provided'}</span>
                            </div>
                            <div className="flex items-start gap-3 text-sm">
                                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                <span className="text-gray-600 dark:text-gray-400">
                                    {profile?.city && profile?.state
                                        ? `${profile.city}, ${profile.state}`
                                        : 'Not provided'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Verification Status Card for Sellers */}
                    {isSeller && profile?.verification_status === 'rejected' && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-red-900 dark:text-red-200 mb-1 text-sm">
                                        Verification Rejected
                                    </h4>
                                    <p className="text-xs text-red-800 dark:text-red-300 mb-2">
                                        {profile.rejection_reason || 'Your account verification was rejected. Please contact support.'}
                                    </p>
                                    <Link
                                        href="/contact"
                                        className="text-xs font-medium text-red-700 dark:text-red-400 hover:underline"
                                    >
                                        Contact Support →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Detailed Information */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Edit Basic Info */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Edit Profile
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.full_name}
                                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={profile?.email}
                                        disabled
                                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Email cannot be changed</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    type="submit"
                                    disabled={updateProfile.isPending}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-5 h-5" />
                                    {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Seller Verification Details */}
                    {isSeller && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                Seller Verification Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                        Business Name
                                    </label>
                                    <p className="text-gray-900 dark:text-white font-medium">
                                        {profile?.business_name || 'Not provided'}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                        Registration Number
                                    </label>
                                    <p className="text-gray-900 dark:text-white font-medium">
                                        {profile?.business_reg_number || 'Not provided'}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                        NIN (National ID)
                                    </label>
                                    <p className="text-gray-900 dark:text-white font-medium font-mono">
                                        {profile?.nin ? `***-***-${profile.nin.slice(-4)}` : 'Not provided'}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                        Verification Status
                                    </label>
                                    {getVerificationBadge()}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Address Information */}
                    {isSeller && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                Address Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                        Street Address
                                    </label>
                                    <p className="text-gray-900 dark:text-white font-medium">
                                        {profile?.street_address || 'Not provided'}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                        City
                                    </label>
                                    <p className="text-gray-900 dark:text-white font-medium">
                                        {profile?.city || 'Not provided'}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                        State
                                    </label>
                                    <p className="text-gray-900 dark:text-white font-medium">
                                        {profile?.state || 'Not provided'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Account Information */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <CreditCard className="w-5 h-5" />
                            Account Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    Account Type
                                </label>
                                <p className="text-gray-900 dark:text-white font-medium capitalize">
                                    {profile?.role === 'client' ? 'Seller' : profile?.role || 'Buyer'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    Member Since
                                </label>
                                <p className="text-gray-900 dark:text-white font-medium">
                                    {profile?.created_at
                                        ? new Date(profile.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })
                                        : 'N/A'}
                                </p>
                            </div>
                            {isSeller && profile?.verified_at && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                        Verified On
                                    </label>
                                    <p className="text-gray-900 dark:text-white font-medium">
                                        {new Date(profile.verified_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
