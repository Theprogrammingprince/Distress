# Frontend Integration Guide

## Setup

### 1. Install Dependencies
Already installed:
- `@tanstack/react-query`
- `@tanstack/react-query-devtools`
- `@supabase/supabase-js`

### 2. Configure Environment Variables

Create `.env.local` in the `distress` directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these from: Supabase Dashboard > Settings > API

### 3. QueryProvider Already Integrated

The `QueryProvider` has been added to `app/layout.tsx` and wraps the entire application.

## Using the API

### Example 1: Display Products

```tsx
'use client';

import { useProducts } from '@/lib/hooks/useProducts';

export default function ProductList() {
  const { data, isLoading, error } = useProducts({ 
    category: 'Electronics',
    limit: 12 
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Example 2: Search Products

```tsx
'use client';

import { useState } from 'react';
import { useSearchProducts } from '@/lib/hooks/useProducts';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const { data } = useSearchProducts(query);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      {data?.results.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Example 3: Shopping Cart

```tsx
'use client';

import { useCart, useAddToCart, useRemoveFromCart } from '@/lib/hooks/useCart';

export default function Cart() {
  const { data: cart } = useCart();
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();

  const handleAdd = (productId: string) => {
    addToCart.mutate({ product_id: productId, quantity: 1 });
  };

  const handleRemove = (itemId: string) => {
    removeFromCart.mutate(itemId);
  };

  return (
    <div>
      <h2>Cart Total: ${cart?.total}</h2>
      {cart?.items.map(item => (
        <div key={item.id}>
          <span>{item.products.name}</span>
          <span>Qty: {item.quantity}</span>
          <button onClick={() => handleRemove(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
```

### Example 4: Create Order

```tsx
'use client';

import { useCreateOrder } from '@/lib/hooks/useOrders';
import { useCart } from '@/lib/hooks/useCart';

export default function Checkout() {
  const { data: cart } = useCart();
  const createOrder = useCreateOrder();

  const handleCheckout = async () => {
    if (!cart) return;

    const orderData = {
      items: cart.items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.products.price,
      })),
      total_amount: cart.total,
      shipping_address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'USA',
      },
      payment_method: 'credit_card',
    };

    try {
      const order = await createOrder.mutateAsync(orderData);
      console.log('Order created:', order);
      // Redirect to success page
    } catch (error) {
      console.error('Order failed:', error);
    }
  };

  return (
    <button onClick={handleCheckout} disabled={createOrder.isPending}>
      {createOrder.isPending ? 'Processing...' : 'Place Order'}
    </button>
  );
}
```

### Example 5: Product Management (Admin)

```tsx
'use client';

import { useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/lib/hooks/useProducts';

export default function AdminProducts() {
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const handleCreate = async () => {
    await createProduct.mutateAsync({
      name: 'New Product',
      description: 'Product description',
      price: 99.99,
      category: 'Electronics',
      image_url: '/images/product.jpg',
      stock: 10,
    });
  };

  const handleUpdate = async (id: string) => {
    await updateProduct.mutateAsync({
      id,
      updates: { price: 89.99 },
    });
  };

  const handleDelete = async (id: string) => {
    await deleteProduct.mutateAsync(id);
  };

  return (
    <div>
      <button onClick={handleCreate}>Create Product</button>
      {/* Product list with update/delete buttons */}
    </div>
  );
}
```

## Available Hooks

### Products
- `useProducts(filters)` - Get products with filters
- `useProduct(id)` - Get single product
- `useSearchProducts(query)` - Search products
- `useCreateProduct()` - Create product mutation
- `useUpdateProduct()` - Update product mutation
- `useDeleteProduct()` - Delete product mutation

### Cart
- `useCart()` - Get cart items
- `useAddToCart()` - Add to cart mutation
- `useUpdateCartItem()` - Update cart item mutation
- `useRemoveFromCart()` - Remove from cart mutation

### Orders
- `useOrders()` - Get all orders
- `useOrder(id)` - Get single order
- `useCreateOrder()` - Create order mutation
- `useUpdateOrderStatus()` - Update order status mutation

## Authentication

To use authenticated endpoints, users must be signed in via Supabase Auth:

```tsx
import { supabase } from '@/lib/supabase';

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password',
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
});

// Sign out
await supabase.auth.signOut();

// Get current user
const { data: { user } } = await supabase.auth.getUser();
```

## Error Handling

All hooks return error states:

```tsx
const { data, isLoading, error, isError } = useProducts();

if (isError) {
  console.error('Error:', error.message);
}
```

## Loading States

```tsx
const { data, isLoading, isFetching } = useProducts();

if (isLoading) return <Spinner />;
if (isFetching) return <div>Updating...</div>;
```

## Optimistic Updates

```tsx
const updateCartItem = useUpdateCartItem();

updateCartItem.mutate(
  { id: itemId, quantity: newQuantity },
  {
    onSuccess: () => {
      toast.success('Cart updated!');
    },
    onError: () => {
      toast.error('Failed to update cart');
    },
  }
);
```

## React Query Devtools

In development mode, the React Query Devtools are available at the bottom-right of the screen. Click the floating icon to open the devtools panel.

## TypeScript Support

All API functions and hooks are fully typed. Import types from the API files:

```tsx
import type { Product, ProductFilters } from '@/lib/api/products';
import type { Order, CreateOrderData } from '@/lib/api/orders';
import type { CartItem } from '@/lib/api/cart';
```
