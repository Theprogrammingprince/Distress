'use client';

import { useMutation } from '@tanstack/react-query';
import {
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    type SignUpData,
    type SignInData,
} from '../api/auth';

// Sign up mutation
export const useSignUp = () => {
    return useMutation({
        mutationFn: signUp,
    });
};

// Sign in mutation
export const useSignIn = () => {
    return useMutation({
        mutationFn: signIn,
    });
};

// Sign out mutation
export const useSignOut = () => {
    return useMutation({
        mutationFn: signOut,
    });
};

// Reset password mutation
export const useResetPassword = () => {
    return useMutation({
        mutationFn: resetPassword,
    });
};

// Update password mutation
export const useUpdatePassword = () => {
    return useMutation({
        mutationFn: updatePassword,
    });
};
