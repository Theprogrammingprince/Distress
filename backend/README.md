# Distress E-commerce Backend

This backend is built with Deno and Supabase Edge Functions.

## Setup

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Initialize Supabase:
```bash
cd backend
supabase init
```

3. Link to your Supabase project:
```bash
supabase link --project-ref your-project-ref
```

4. Deploy functions:
```bash
supabase functions deploy
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Available Endpoints

### Products
- `POST /products` - Create a new product
- `GET /products` - Get all products (with pagination and filters)
- `GET /products/:id` - Get a single product
- `PUT /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product

### Orders
- `POST /orders` - Create a new order
- `GET /orders` - Get all orders for a user
- `GET /orders/:id` - Get a single order
- `PUT /orders/:id/status` - Update order status

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `GET /users/orders` - Get user's order history

### Search
- `GET /search` - Search products by query

### Cart
- `POST /cart/add` - Add item to cart
- `GET /cart` - Get cart items
- `PUT /cart/:id` - Update cart item quantity
- `DELETE /cart/:id` - Remove item from cart

### Invoices
- `POST /invoices` - Create invoice
- `GET /invoices` - Get all invoices
- `GET /invoices/:id` - Get single invoice

### Analytics
- `GET /analytics/dashboard` - Get dashboard statistics
- `GET /analytics/sales` - Get sales data

## Database Schema

See `supabase/migrations` for the complete database schema.
