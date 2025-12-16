import { FUNCTIONS_URL, getAuthHeaders } from '../supabase';

export interface Invoice {
    id: string;
    invoice_number: string;
    order_id: string;
    customer_info: any;
    amount: number;
    status: 'pending' | 'paid' | 'cancelled';
    created_at: string;
    updated_at: string;
    orders?: any;
}

// Get all invoices
export const getInvoices = async (): Promise<Invoice[]> => {
    const response = await fetch(`${FUNCTIONS_URL}/invoices`, {
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch invoices');
    }

    return response.json();
};

// Get single invoice
export const getInvoice = async (id: string): Promise<Invoice> => {
    const response = await fetch(`${FUNCTIONS_URL}/invoices/${id}`, {
        headers: await getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch invoice');
    }

    return response.json();
};

// Create invoice
export const createInvoice = async (data: { order_id: string; customer_info: any }): Promise<Invoice> => {
    const response = await fetch(`${FUNCTIONS_URL}/invoices`, {
        method: 'POST',
        headers: await getAuthHeaders(),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to create invoice');
    }

    return response.json();
};
