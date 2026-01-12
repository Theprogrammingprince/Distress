-- Quick Database Check
-- Run this in Supabase SQL Editor to see if your data exists

-- 1. Check if you have any profiles
SELECT COUNT(*) as total_profiles FROM profiles;

-- 2. Check your most recent profile (replace with your email)
SELECT 
  id,
  email,
  full_name,
  phone,
  role,
  verification_status,
  nin,
  business_name,
  business_reg_number,
  street_address,
  city,
  state,
  created_at
FROM profiles 
WHERE email = 'YOUR-EMAIL-HERE@example.com';

-- 3. Check all profiles (see what exists)
SELECT 
  email,
  full_name,
  role,
  verification_status,
  business_name,
  city
FROM profiles 
ORDER BY created_at DESC
LIMIT 5;

-- 4. Check if trigger function exists
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name = 'handle_new_user';

-- 5. Check if trigger is attached
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- 6. Test the metadata extraction (check auth.users)
SELECT 
  id,
  email,
  raw_user_meta_data,
  created_at
FROM auth.users
WHERE email = 'YOUR-EMAIL-HERE@example.com';

-- 7. If profile is missing, manually trigger profile creation
-- First, find your user ID from auth.users (from query 6 above)
-- Then run this (ONLY if profile doesn't exist):
/*
INSERT INTO profiles (
  id, email, full_name, phone, role, verification_status,
  nin, business_name, business_reg_number,
  street_address, city, state
)
SELECT 
  id,
  email,
  raw_user_meta_data->>'full_name',
  raw_user_meta_data->>'phone',
  COALESCE(raw_user_meta_data->>'role', 'buyer'),
  CASE 
    WHEN COALESCE(raw_user_meta_data->>'role', 'buyer') = 'buyer' THEN 'approved'
    ELSE 'pending'
  END,
  raw_user_meta_data->>'nin',
  raw_user_meta_data->>'business_name',
  raw_user_meta_data->>'business_reg_number',
  raw_user_meta_data->>'street_address',
  raw_user_meta_data->>'city',
  raw_user_meta_data->>'state'
FROM auth.users
WHERE email = 'YOUR-EMAIL-HERE@example.com'
AND NOT EXISTS (
  SELECT 1 FROM profiles WHERE profiles.id = auth.users.id
);
*/

-- 8. Check RLS policies on profiles
SELECT 
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'profiles';
