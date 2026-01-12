# Super Admin API Documentation

This document provides all the API endpoints needed for your Super Admin dashboard to manage product verification.

## Base URL
```
https://zrdnrpbhqzhmebgralku.supabase.co/functions/v1
```

## Authentication
All requests must include the following headers:
```javascript
{
  "Authorization": "Bearer YOUR_ACCESS_TOKEN",
  "apikey": "YOUR_SUPABASE_ANON_KEY",
  "Content-Type": "application/json"
}
```

**Note:** The user making these requests must have `role = 'super_admin'` in the `profiles` table.

---

## Product Verification Endpoints

### 1. Get Pending Products
Get all products awaiting verification.

**Endpoint:** `GET /admin/pending`

**Query Parameters:**
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 20) - Items per page

**Example Request:**
```javascript
GET /admin/pending?page=1&limit=20
```

**Example Response:**
```json
{
  "products": [
    {
      "id": "uuid",
      "name": "Product Name",
      "description": "Product description",
      "price": 15000,
      "currency": "NGN",
      "category": "electronics",
      "image_url": "https://...",
      "stock": 50,
      "verification_status": "pending",
      "created_at": "2026-01-12T10:00:00Z",
      "seller": {
        "id": "uuid",
        "full_name": "John Doe",
        "email": "john@example.com"
      }
    }
  ],
  "total": 45,
  "page": 1,
  "totalPages": 3
}
```

---

### 2. Get All Products (with filter)
Get all products with optional status filter.

**Endpoint:** `GET /admin/all`

**Query Parameters:**
- `status` (optional) - Filter by status: `pending`, `approved`, or `rejected`
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 20) - Items per page

**Example Request:**
```javascript
GET /admin/all?status=approved&page=1&limit=20
// or
GET /admin/all  // Get all products regardless of status
```

**Example Response:**
```json
{
  "products": [...],
  "total": 120,
  "page": 1,
  "totalPages": 6
}
```

---

### 3. Get Verification Statistics
Get overview statistics for the verification dashboard.

**Endpoint:** `GET /admin/stats`

**Example Request:**
```javascript
GET /admin/stats
```

**Example Response:**
```json
{
  "pending_count": 45,
  "approved_count": 320,
  "rejected_count": 18,
  "total_count": 383
}
```

---

### 4. Get Single Product Details
Get detailed information about a specific product.

**Endpoint:** `GET /admin/product/:id`

**Example Request:**
```javascript
GET /admin/product/550e8400-e29b-41d4-a716-446655440000
```

**Example Response:**
```json
{
  "id": "uuid",
  "name": "Product Name",
  "description": "Detailed description",
  "price": 15000,
  "currency": "NGN",
  "category": "electronics",
  "image_url": "https://...",
  "stock": 50,
  "verification_status": "pending",
  "created_at": "2026-01-12T10:00:00Z",
  "seller": {
    "id": "uuid",
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "+234..."
  },
  "verifier": null,
  "verified_at": null,
  "rejection_reason": null
}
```

---

### 5. Approve Product
Approve a pending product (makes it visible to customers).

**Endpoint:** `POST /admin/approve`

**Request Body:**
```json
{
  "product_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Example Response:**
```json
{
  "message": "Product approved successfully",
  "product": {
    "id": "uuid",
    "name": "Product Name",
    "verification_status": "approved",
    "verified_at": "2026-01-12T12:00:00Z",
    "verified_by": "admin_uuid",
    ...
  }
}
```

---

### 6. Reject Product
Reject a product with a reason.

**Endpoint:** `POST /admin/reject`

**Request Body:**
```json
{
  "product_id": "550e8400-e29b-41d4-a716-446655440000",
  "reason": "Product images are unclear. Please provide better quality images."
}
```

**Example Response:**
```json
{
  "message": "Product rejected successfully",
  "product": {
    "id": "uuid",
    "name": "Product Name",
    "verification_status": "rejected",
    "verified_at": "2026-01-12T12:00:00Z",
    "verified_by": "admin_uuid",
    "rejection_reason": "Product images are unclear...",
    ...
  }
}
```

---

## Frontend Integration Example

Here's a complete example of how to use these APIs in your super admin project:

### React/Next.js Example with Fetch

```typescript
// lib/adminApi.ts
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Get access token from Supabase auth
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function getHeaders() {
  const { data: { session } } = await supabase.auth.getSession();
  return {
    'Authorization': `Bearer ${session?.access_token}`,
    'apikey': SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
  };
}

// Fetch pending products
export async function getPendingProducts(page = 1, limit = 20) {
  const headers = await getHeaders();
  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/admin/pending?page=${page}&limit=${limit}`,
    { headers }
  );
  return response.json();
}

// Fetch all products with optional status filter
export async function getAllProducts(status?: string, page = 1, limit = 20) {
  const headers = await getHeaders();
  const statusParam = status ? `&status=${status}` : '';
  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/admin/all?page=${page}&limit=${limit}${statusParam}`,
    { headers }
  );
  return response.json();
}

// Get verification stats
export async function getVerificationStats() {
  const headers = await getHeaders();
  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/admin/stats`,
    { headers }
  );
  return response.json();
}

// Get single product
export async function getProduct(productId: string) {
  const headers = await getHeaders();
  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/admin/product/${productId}`,
    { headers }
  );
  return response.json();
}

// Approve product
export async function approveProduct(productId: string) {
  const headers = await getHeaders();
  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/admin/approve`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ product_id: productId }),
    }
  );
  return response.json();
}

// Reject product
export async function rejectProduct(productId: string, reason: string) {
  const headers = await getHeaders();
  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/admin/reject`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ product_id: productId, reason }),
    }
  );
  return response.json();
}
```

### React Component Example

```tsx
// components/ProductVerification.tsx
import { useState, useEffect } from 'react';
import { getPendingProducts, approveProduct, rejectProduct } from '@/lib/adminApi';

export default function ProductVerification() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    const data = await getPendingProducts(1, 20);
    setProducts(data.products);
    setLoading(false);
  }

  async function handleApprove(productId: string) {
    const result = await approveProduct(productId);
    if (result.message) {
      alert('Product approved!');
      loadProducts(); // Refresh list
    }
  }

  async function handleReject(productId: string) {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;

    const result = await rejectProduct(productId, reason);
    if (result.message) {
      alert('Product rejected!');
      loadProducts(); // Refresh list
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Pending Products ({products.length})</h2>
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: {product.currency} {product.price.toLocaleString()}</p>
          <p>Seller: {product.seller.full_name}</p>
          <img src={product.image_url} alt={product.name} />
          
          <div className="actions">
            <button onClick={() => handleApprove(product.id)}>
              Approve
            </button>
            <button onClick={() => handleReject(product.id)}>
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## Error Handling

All error responses follow this format:

```json
{
  "error": "Error message description"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (missing or invalid parameters)
- `401` - Unauthorized (not logged in)
- `403` - Forbidden (not a super admin)
- `404` - Not Found
- `405` - Method Not Allowed
- `500` - Internal Server Error

---

## Database Schema References

### Products Table
```sql
products (
  id                    UUID PRIMARY KEY,
  name                  TEXT NOT NULL,
  description           TEXT,
  price                 DECIMAL(10, 2) NOT NULL,
  currency              TEXT ('NGN' | 'USD'),
  category              TEXT NOT NULL,
  image_url             TEXT,
  stock                 INTEGER DEFAULT 0,
  rating                DECIMAL(2, 1) DEFAULT 0,
  reviews_count         INTEGER DEFAULT 0,
  badge                 TEXT,
  seller_id             UUID REFERENCES auth.users(id),
  verification_status   TEXT ('pending' | 'approved' | 'rejected'),
  verified_at           TIMESTAMP WITH TIME ZONE,
  verified_by           UUID REFERENCES auth.users(id),
  rejection_reason      TEXT,
  created_at            TIMESTAMP WITH TIME ZONE,
  updated_at            TIMESTAMP WITH TIME ZONE
)
```

### Profiles Table
```sql
profiles (
  id          UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name   TEXT,
  email       TEXT UNIQUE NOT NULL,
  phone       TEXT,
  avatar_url  TEXT,
  address     JSONB,
  role        TEXT ('buyer' | 'seller' | 'super_admin'),
  created_at  TIMESTAMP WITH TIME ZONE,
  updated_at  TIMESTAMP WITH TIME ZONE
)
```

---

## Setup Instructions

### 1. Deploy the Migration
```bash
cd backend
supabase db push
```

### 2. Deploy the Admin Function
```bash
supabase functions deploy admin
```

### 3. Set Environment Variables (if needed)
In your Supabase Dashboard → Edge Functions → Secrets, ensure:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (if using service role)

### 4. Verify Super Admin Role
Make sure your admin user has the `super_admin` role in the profiles table:
```sql
UPDATE profiles
SET role = 'super_admin'
WHERE email = 'your-admin-email@example.com';
```

---

## Testing the API

You can test the endpoints using curl:

```bash
# Get pending products
curl -X GET "https://zrdnrpbhqzhmebgralku.supabase.co/functions/v1/admin/pending" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "apikey: YOUR_ANON_KEY"

# Approve a product
curl -X POST "https://zrdnrpbhqzhmebgralku.supabase.co/functions/v1/admin/approve" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"product_id": "your-product-uuid"}'
```

---

## Notes

1. **Security**: All admin endpoints check for `super_admin` role before allowing access
2. **Pagination**: All list endpoints support pagination for better performance
3. **RLS Policies**: Row Level Security ensures sellers can only see their own products, while admins see everything
4. **Seller Information**: All product responses include detailed seller information for verification purposes
5. **Currency Support**: Products can be priced in NGN (Naira) or USD (Dollars)

---

For any questions or issues, refer to the main backend documentation or Supabase documentation.
