import { FUNCTIONS_URL, getAuthHeaders } from '../supabase';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image_url: string;
    stock: number;
    rating?: number;
    reviews_count?: number;
    badge?: string;
    created_at: string;
    updated_at: string;
}

export interface ProductsResponse {
    products: Product[];
    total: number;
    page: number;
    totalPages: number;
}

export interface ProductFilters {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    page?: number;
    limit?: number;
}

// Get all products with filters
export const getProducts = async (filters: ProductFilters = {}): Promise<ProductsResponse> => {
    const params = new URLSearchParams();

    if (filters.category) params.append('category', filters.category);
    if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters.search) params.append('search', filters.search);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    const response = await fetch(`${FUNCTIONS_URL}/products?${params}`, {
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    return response.json();
};

// Get single product
export const getProduct = async (id: string): Promise<Product> => {
    const response = await fetch(`${FUNCTIONS_URL}/products/${id}`, {
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }

    return response.json();
};

// Create product
export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> => {
    const response = await fetch(`${FUNCTIONS_URL}/products`, {
        method: 'POST',
        headers: await getAuthHeaders(),
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error('Failed to create product');
    }

    return response.json();
};

// Update product
export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product> => {
    const response = await fetch(`${FUNCTIONS_URL}/products/${id}`, {
        method: 'PUT',
        headers: await getAuthHeaders(),
        body: JSON.stringify(updates),
    });

    if (!response.ok) {
        throw new Error('Failed to update product');
    }

    return response.json();
};

// Delete product
export const deleteProduct = async (id: string): Promise<void> => {
    const response = await fetch(`${FUNCTIONS_URL}/products/${id}`, {
        method: 'DELETE',
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to delete product');
    }
};

// Search products
export const searchProducts = async (query: string): Promise<{ query: string; results: Product[]; count: number }> => {
    const response = await fetch(`${FUNCTIONS_URL}/search?q=${encodeURIComponent(query)}`, {
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to search products');
    }

    return response.json();
};
