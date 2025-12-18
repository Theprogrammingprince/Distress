'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
} from '../api/cart';

// Get cart
export const useCart = () => {
    return useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
    });
};

// Add to cart mutation
export const useAddToCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ product_id, quantity }: { product_id: string; quantity?: number }) =>
            addToCart(product_id, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
};

// Update cart item mutation
export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
            updateCartItem(id, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
};

// Remove from cart mutation
export const useRemoveFromCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeFromCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
};
