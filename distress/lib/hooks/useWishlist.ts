'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    removeFromWishlistByProduct,
} from '../api/wishlist';

// Get wishlist
export const useWishlist = () => {
    return useQuery({
        queryKey: ['wishlist'],
        queryFn: getWishlist,
    });
};

// Add to wishlist mutation
export const useAddToWishlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addToWishlist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
        },
    });
};

// Remove from wishlist mutation
export const useRemoveFromWishlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeFromWishlist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
        },
    });
};

// Remove from wishlist by product mutation
export const useRemoveFromWishlistByProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeFromWishlistByProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
        },
    });
};
