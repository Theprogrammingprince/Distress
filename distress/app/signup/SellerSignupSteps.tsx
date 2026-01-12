'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Mail, Lock, Phone, Eye, EyeOff, FileText,
    MapPin, Building2, Upload, CheckCircle, ArrowRight, ArrowLeft
} from 'lucide-react';
import Image from 'next/image';

interface SellerFormData {
    // Step 1: Account Details
    fullName: string;
    email: string;
    password: string;
    phone: string;

    // Step 2: Business Verification
    nin: string;
    businessName: string;
    businessRegNumber: string;

    // Step 3: Address
    streetAddress: string;
    city: string;
    state: string;

    // Step 4: Profile Picture
    profilePicture: File | null;
    profilePicturePreview: string;
}

interface SellerSignupStepsProps {
    onSubmit: (data: SellerFormData) => void;
    onBack: () => void;
    isLoading: boolean;
}

export default function SellerSignupSteps({ onSubmit, onBack, isLoading }: SellerSignupStepsProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<SellerFormData>({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        nin: '',
        businessName: '',
        businessRegNumber: '',
        streetAddress: '',
        city: '',
        state: '',
        profilePicture: null,
        profilePicturePreview: '',
    });

    const totalSteps = 4;

    const handleInputChange = (field: keyof SellerFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                profilePicture: file,
                profilePicturePreview: URL.createObjectURL(file)
            }));
        }
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return formData.fullName && formData.email && formData.password && formData.phone;
            case 2:
                return formData.nin && formData.streetAddress;
            case 3:
                return formData.city && formData.state;
            case 4:
                return true; // Profile picture is optional
            default:
                return false;
        }
    };

    return (
        <div className="max-w-2xl w-full mx-auto">
            {/* Progress Indicator */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    {[1, 2, 3, 4].map((step) => (
                        <div key={step} className="flex items-center flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${step < currentStep ? 'bg-teal-600 text-white' :
                                    step === currentStep ? 'bg-teal-600 text-white ring-4 ring-teal-100' :
                                        'bg-gray-200 text-gray-500'
                                }`}>
                                {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                            </div>
                            {step < 4 && (
                                <div className={`flex-1 h-1 mx-2 ${step < currentStep ? 'bg-teal-600' : 'bg-gray-200'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-2 px-2">
                    <span>Account</span>
                    <span>Verification</span>
                    <span>Address</span>
                    <span>Picture</span>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                <AnimatePresence mode="wait">
                    {/* Step 1: Account Details */}
                    {currentStep === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h2 className="text-2xl font-bold mb-6">Account Details</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) => handleInputChange('fullName', e.target.value)}
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
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            placeholder="you@example.com"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
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
                                            onChange={(e) => handleInputChange('password', e.target.value)}
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
                        </motion.div>
                    )}

                    {/* Step 2: Business Verification */}
                    {currentStep === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h2 className="text-2xl font-bold mb-6">Business Verification</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        NIN (National Identification Number) *
                                    </label>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.nin}
                                            onChange={(e) => handleInputChange('nin', e.target.value)}
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
                                        Business Name (Optional)
                                    </label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.businessName}
                                            onChange={(e) => handleInputChange('businessName', e.target.value)}
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
                                        onChange={(e) => handleInputChange('businessRegNumber', e.target.value)}
                                        placeholder="RC123456"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Address */}
                    {currentStep === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h2 className="text-2xl font-bold mb-6">Address Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Street Address *
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.streetAddress}
                                            onChange={(e) => handleInputChange('streetAddress', e.target.value)}
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
                                            onChange={(e) => handleInputChange('city', e.target.value)}
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
                                            onChange={(e) => handleInputChange('state', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            required
                                        >
                                            <option value="">Select State</option>
                                            <option value="Lagos">Lagos</option>
                                            <option value="Abuja">Abuja (FCT)</option>
                                            <option value="Kano">Kano</option>
                                            <option value="Rivers">Rivers</option>
                                            <option value="Oyo">Oyo</option>
                                            <option value="Delta">Delta</option>
                                            <option value="Kaduna">Kaduna</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 4: Profile Picture */}
                    {currentStep === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h2 className="text-2xl font-bold mb-6">Profile Picture (Optional)</h2>
                            <div className="space-y-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-4 overflow-hidden">
                                        {formData.profilePicturePreview ? (
                                            <Image
                                                src={formData.profilePicturePreview}
                                                alt="Profile preview"
                                                width={128}
                                                height={128}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-16 h-16 text-gray-400" />
                                        )}
                                    </div>

                                    <label className="cursor-pointer">
                                        <div className="flex items-center gap-2 px-6 py-3 bg-teal-50 text-teal-600 rounded-xl hover:bg-teal-100 transition-colors">
                                            <Upload className="w-5 h-5" />
                                            <span className="font-medium">Upload Photo</span>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                    <p className="text-xs text-gray-500 mt-2">
                                        JPG, PNG or GIF. Max size 5MB
                                    </p>
                                </div>

                                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6">
                                    <p className="text-sm text-amber-800">
                                        <strong>Note:</strong> You can skip this step and add your profile picture later from your dashboard.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={currentStep === 1 ? onBack : prevStep}
                        className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>

                    {currentStep < totalSteps ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            disabled={!isStepValid()}
                            className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                        >
                            Next
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                            <CheckCircle className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
