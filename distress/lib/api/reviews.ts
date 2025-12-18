import { FUNCTIONS_URL, getAuthHeaders } from '../supabase';

export interface Review {
    id: string;
    user_id: string;
    product_id: string;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
    profiles?: {
        full_name: string;
        avatar_url?: string;
    };
}

export interface ReviewsResponse {
    reviews: Review[];
    average_rating: number;
    total_reviews: number;
}

// Get reviews for a product
export const getProductReviews = async (product_id: string): Promise<ReviewsResponse> => {
    const response = await fetch(`${FUNCTIONS_URL}/reviews/product/${product_id}`, {
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch reviews');
    }

    return response.json();
};

// Create a review
export const createReview = async (data: {
    product_id: string;
    rating: number;
    comment: string;
}): Promise<Review> => {
    const response = await fetch(`${FUNCTIONS_URL}/reviews`, {
        method: 'POST',
        headers: await getAuthHeaders(),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to create review');
    }

    return response.json();
};

// Update a review
export const updateReview = async (id: string, data: {
    rating: number;
    comment: string;
}): Promise<Review> => {
    const response = await fetch(`${FUNCTIONS_URL}/reviews/${id}`, {
        method: 'PUT',
        headers: await getAuthHeaders(),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to update review');
    }

    return response.json();
};

// Delete a review
export const deleteReview = async (id: string): Promise<void> => {
    const response = await fetch(`${FUNCTIONS_URL}/reviews/${id}`, {
        method: 'DELETE',
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to delete review');
    }
};
