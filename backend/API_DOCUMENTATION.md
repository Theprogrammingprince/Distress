# API Documentation

## Base URL
```
https://YOUR_PROJECT_REF.supabase.co/functions/v1
```

## Authentication
All endpoints require authentication via Bearer token in the Authorization header:
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## Products API

### GET /products
Get all products with optional filters

**Query Parameters:**
- `category` (string): Filter by category
- `minPrice` (number): Minimum price
- `maxPrice` (number): Maximum price
- `search` (string): Search in name and description
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 12)

**Response:**
```json
{
  "products": [
    {
      "id": "uuid",
      "name": "Product Name",
      "description": "Product description",
      "price": 99.99,
      "category": "Electronics",
      "image_url": "/path/to/image.jpg",
      "stock": 10,
      "rating": 4.5,
      "reviews_count": 100,
      "badge": "New",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 100,
  "page": 1,
  "totalPages": 9
}
```

### GET /products/:id
Get a single product

**Response:**
```json
{
  "id": "uuid",
  "name": "Product Name",
  ...
}
```

### POST /products
Create a new product

**Request Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "image_url": "/path/to/image.jpg",
  "stock": 10
}
```

### PUT /products/:id
Update a product

**Request Body:**
```json
{
  "name": "Updated Name",
  "price": 89.99
}
```

### DELETE /products/:id
Delete a product

---

## Search API

### GET /search
Search products

**Query Parameters:**
- `q` (string, required): Search query

**Response:**
```json
{
  "query": "laptop",
  "results": [...products],
  "count": 5
}
```

---

## Cart API

### GET /cart
Get user's cart

**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "product_id": "uuid",
      "quantity": 2,
      "products": {...product_details}
    }
  ],
  "total": 199.98,
  "itemCount": 2
}
```

### POST /cart/add
Add item to cart

**Request Body:**
```json
{
  "product_id": "uuid",
  "quantity": 1
}
```

### PUT /cart/:id
Update cart item quantity

**Request Body:**
```json
{
  "quantity": 3
}
```

### DELETE /cart/:id
Remove item from cart

---

## Orders API

### GET /orders
Get all orders for the authenticated user

**Response:**
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "total_amount": 299.99,
    "shipping_address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zip": "10001",
      "country": "USA"
    },
    "payment_method": "credit_card",
    "status": "pending",
    "created_at": "2024-01-01T00:00:00Z",
    "order_items": [...]
  }
]
```

### GET /orders/:id
Get a single order

### POST /orders
Create a new order

**Request Body:**
```json
{
  "items": [
    {
      "product_id": "uuid",
      "quantity": 2,
      "price": 99.99
    }
  ],
  "total_amount": 199.98,
  "shipping_address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "USA"
  },
  "payment_method": "credit_card"
}
```

### PUT /orders/:id/status
Update order status

**Request Body:**
```json
{
  "status": "shipped"
}
```

**Valid statuses:** `pending`, `processing`, `shipped`, `delivered`, `cancelled`

---

## Users API

### GET /users/profile
Get user profile

**Response:**
```json
{
  "id": "uuid",
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "avatar_url": "/path/to/avatar.jpg",
  "address": {...}
}
```

### PUT /users/profile
Update user profile

**Request Body:**
```json
{
  "full_name": "Jane Doe",
  "phone": "+1234567890"
}
```

### GET /users/orders
Get user's order history

---

## Invoices API

### GET /invoices
Get all invoices

### GET /invoices/:id
Get a single invoice

### POST /invoices
Create an invoice

**Request Body:**
```json
{
  "order_id": "uuid",
  "customer_info": {
    "name": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St"
  }
}
```

---

## Analytics API

### GET /analytics/dashboard
Get dashboard statistics

**Response:**
```json
{
  "totalRevenue": 50000,
  "totalOrders": 250,
  "completedOrders": 200,
  "pendingOrders": 50,
  "totalProducts": 100,
  "totalCustomers": 150,
  "lowStockProducts": [...],
  "recentOrders": [...]
}
```

### GET /analytics/sales
Get sales data

**Query Parameters:**
- `period` (string): `week`, `month`, or `year` (default: `week`)

**Response:**
```json
[
  {
    "date": "2024-01-01",
    "revenue": 1500,
    "orders": 15
  }
]
```

---

## Error Responses

All endpoints return errors in the following format:

```json
{
  "error": "Error message description"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `405` - Method Not Allowed
- `500` - Internal Server Error
