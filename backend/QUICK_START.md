# Quick Start Guide

## 🚀 **5-Minute Setup**

### **Step 1: Supabase Setup** (2 minutes)
1. Go to [supabase.com](https://supabase.com) and create a project
2. Copy your project URL and anon key from Settings > API
3. Save them for Step 3

### **Step 2: Deploy Backend** (2 minutes)
```bash
cd backend

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Deploy database
supabase db push

# Deploy all functions at once
npm run deploy:all
```

### **Step 3: Configure Frontend** (1 minute)
Create `distress/.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### **Step 4: Start Development**
```bash
cd distress
npm run dev
```

---

## 📋 **Quick Reference**

### **All Endpoints:**
```
Products:     /products
Search:       /search
Cart:         /cart
Orders:       /orders
Users:        /users
Invoices:     /invoices
Analytics:    /analytics
Auth:         /auth
Wishlist:     /wishlist
Reviews:      /reviews
```

### **Example Usage:**

#### **Display Products:**
```tsx
import { useProducts } from '@/lib/hooks/useProducts';

const { data, isLoading } = useProducts({ category: 'Electronics' });
```

#### **Add to Cart:**
```tsx
import { useAddToCart } from '@/lib/hooks/useCart';

const addToCart = useAddToCart();
addToCart.mutate({ product_id: 'uuid', quantity: 1 });
```

#### **Sign Up:**
```tsx
import { useSignUp } from '@/lib/hooks/useAuth';

const signUp = useSignUp();
signUp.mutate({ email: 'user@example.com', password: 'password' });
```

#### **Add to Wishlist:**
```tsx
import { useAddToWishlist } from '@/lib/hooks/useWishlist';

const addToWishlist = useAddToWishlist();
addToWishlist.mutate('product-id');
```

#### **Create Review:**
```tsx
import { useCreateReview } from '@/lib/hooks/useReviews';

const createReview = useCreateReview();
createReview.mutate({
  product_id: 'uuid',
  rating: 5,
  comment: 'Great product!'
});
```

---

## 🔧 **Common Commands**

### **Backend:**
```bash
# Deploy single function
supabase functions deploy products

# View logs
supabase functions logs products

# Reset database
supabase db reset

# Check status
supabase status
```

### **Frontend:**
```bash
# Development
npm run dev

# Build
npm run build

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

---

## 🐛 **Troubleshooting**

### **"Cannot find module" errors:**
- Check import paths are correct
- Ensure all dependencies are installed

### **CORS errors:**
- Verify SUPABASE_URL in environment variables
- Check corsHeaders in edge functions

### **Auth errors:**
- Confirm user is signed in
- Check Authorization header is being sent

### **Database errors:**
- Run `supabase db push` to apply migrations
- Check RLS policies are enabled

---

## 📖 **Full Documentation**

- **API Reference:** `backend/API_DOCUMENTATION.md`
- **Deployment Guide:** `backend/DEPLOYMENT.md`
- **Integration Examples:** `backend/FRONTEND_INTEGRATION.md`
- **Complete Summary:** `backend/COMPLETE_SYSTEM_SUMMARY.md`

---

**✅ You're all set! Happy coding! 🎉**
