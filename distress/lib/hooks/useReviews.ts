'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getProductReviews,
    createReview,
    updateReview,
    deleteReview,
} from '../api/reviews';

// Get product reviews
export const useProductReviews = (product_id: string) => {
    return useQuery({
        queryKey: ['reviews', product_id],
        queryFn: () => getProductReviews(product_id),
        enabled: !!product_id,
    });
};

// Create review mutation
export const useCreateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createReview,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['reviews', variables.product_id] });
            queryClient.invalidateQueries({ queryKey: ['product', variables.product_id] });
        },
    });
};

// Update review mutation
export const useUpdateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: { rating: number; comment: string } }) =>
            updateReview(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
        },
    });
};

// Delete review mutation
export const useDeleteReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
        },
    });
};
