'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, products as initialProducts } from '@/lib/products';

interface ProductsContextType {
    products: Product[];
    addProduct: (product: Omit<Product, 'id'>) => void;
    updateProduct: (id: string, product: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    getProduct: (id: string) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedProducts = localStorage.getItem('distress_products');
        if (savedProducts) {
            try {
                setProducts(JSON.parse(savedProducts));
            } catch (e) {
                console.error('Failed to parse products from local storage', e);
                setProducts(initialProducts);
            }
        } else {
            setProducts(initialProducts);
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever products change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('distress_products', JSON.stringify(products));
        }
    }, [products, isLoaded]);

    const addProduct = (newProductData: Omit<Product, 'id'>) => {
        const newProduct: Product = {
            ...newProductData,
            id: Math.random().toString(36).substr(2, 9), // Simple ID generation
        };
        setProducts(prev => [newProduct, ...prev]);
    };

    const updateProduct = (id: string, productUpdates: Partial<Product>) => {
        setProducts(prev => prev.map(p =>
            p.id === id ? { ...p, ...productUpdates } : p
        ));
    };

    const deleteProduct = (id: string) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const getProduct = (id: string) => {
        return products.find(p => p.id === id);
    };

    return (
        <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProduct }}>
            {children}
        </ProductsContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductsContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
}
