# 🚀 Setup Instructions

## 1. 📧 Disable Email Verification (Skip Verification)

To allow users to sign up and go straight to the dashboard without verifying their email:

1.  Go to your **Supabase Dashboard** (https://supabase.com/dashboard/project/...).
2.  Click on **Authentication** in the left sidebar.
3.  Click on **Providers** under Configuration.
4.  Click on **Email**.
5.  **Disable** the toggle for **Confirm email**.
6.  Click **Save**.

Now, when users sign up, they will be logged in immediately!

---

## 2. 🗄️ Run Database Migration

To ensure the "Roles" (Buyer vs Seller) work correctly, you must run the migration I created. This adds the `role` column to your database.

Run this command in your terminal (Backend directory):

```bash
cd backend
supabase db push
```

**⚠️ Troubleshooting SQL Errors:**
If you see `ERROR: 42710: policy "Users can view their own profile" ... already exists`, it means your database is already set up! You can ignore this error.

To manually ensure the `role` column exists, run this in your Supabase SQL Editor:
```sql
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'buyer';
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
```

---

## 3. 🐛 Profile Creation Fix

I have fixed the "User registered not going to profile table" issue by updating the backend.

**IMPORTANT:**
- Users created **before** this fix might be broken (missing profile).
- Please **Sign Up with a NEW email address** to test the dashboard.

---

## 4. 🛡️ User Roles

- **Buyers**: Can see "My Orders", "Wishlist", "Profile".
- **Clients (Sellers)**: Can see "Products", "Orders", "Invoices", "Customers".

The role is selected during Sign Up.
