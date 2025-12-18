'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getOrders,
    getOrder,
    createOrder,
    updateOrderStatus,
    type CreateOrderData,
    type Order,
} from '../api/orders';

// Get all orders
export const useOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: getOrders,
    });
};

// Get single order
export const useOrder = (id: string) => {
    return useQuery({
        queryKey: ['order', id],
        queryFn: () => getOrder(id),
        enabled: !!id,
    });
};

// Create order mutation
export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
};

// Update order status mutation
export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: Order['status'] }) =>
            updateOrderStatus(id, status),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.invalidateQueries({ queryKey: ['order', variables.id] });
        },
    });
};
