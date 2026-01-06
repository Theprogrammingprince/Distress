'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Save, Camera } from 'lucide-react';
import { useProfile } from '@/lib/hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserProfile } from '@/lib/api/users';
import toast from 'react-hot-toast';

export default function ProfilePage() {
    const { data: profile, isLoading } = useProfile();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        address: '',
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                full_name: profile.full_name || '',
                email: profile.email || '',
                phone: profile.phone || '',
                address: profile.address?.address || '',
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
            address: { ...profile?.address, address: formData.address },
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

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">My Profile</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your account information and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                            <div className="w-24 h-24 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center text-3xl font-bold text-teal-600 dark:text-teal-400">
                                {profile?.full_name?.substring(0, 2).toUpperCase() || 'US'}
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors shadow-sm">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {profile?.full_name || 'User Name'}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mb-4">
                            {profile?.role || 'Buyer'}
                        </p>
                        <div className="w-full h-px bg-gray-100 dark:bg-gray-700 mb-4" />
                        <div className="space-y-3 text-left">
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <Mail className="w-4 h-4" />
                                <span className="truncate">{profile?.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <Phone className="w-4 h-4" />
                                <span>{profile?.phone || 'No phone number'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <MapPin className="w-4 h-4" />
                                <span>{profile?.address?.address || 'No address set'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Edit Profile</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.full_name}
                                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            disabled
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Address
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
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
                </div>
            </div>
        </div>
    );
}
