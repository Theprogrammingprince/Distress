'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    type ProductFilters,
    type Product,
} from '../api/products';

// Get products with filters
export const useProducts = (filters: ProductFilters = {}) => {
    return useQuery({
        queryKey: ['products', filters],
        queryFn: () => getProducts(filters),
    });
};

// Get single product
export const useProduct = (id: string) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => getProduct(id),
        enabled: !!id,
    });
};

// Search products
export const useSearchProducts = (query: string) => {
    return useQuery({
        queryKey: ['search', query],
        queryFn: () => searchProducts(query),
        enabled: query.length > 0,
    });
};

// Create product mutation
export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};

// Update product mutation
export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: Partial<Product> }) =>
            updateProduct(id, updates),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
        },
    });
};

// Delete product mutation
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};
