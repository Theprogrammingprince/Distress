-- ============================================
-- CLEANUP & VERIFICATION SCRIPT
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. CLEAN UP OLD TEST DATA (OPTIONAL)
-- Only run this if you want to delete previous test accounts
-- ============================================
/*
DELETE FROM auth.users WHERE email LIKE '%test%';
-- The profiles will be auto-deleted due to cascade
*/

-- 2. VERIFY TRIGGER EXISTS
-- ============================================
SELECT 
  trigger_name, 
  event_manipulation, 
  event_object_table,
  action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- Expected: Should show trigger on auth.users table
-- Action: EXECUTE FUNCTION public.handle_new_user()

-- 3. VERIFY PROFILE TABLE STRUCTURE
-- ============================================
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'profiles'
ORDER BY ordinal_position;

-- Expected columns:
-- id, email, full_name, phone, role, avatar_url, address,
-- verification_status, verified_at, verified_by, rejection_reason,
-- business_name, business_reg_number, nin,
-- street_address, city, state, created_at, updated_at

-- 4. CHECK EXISTING PROFILES
-- ============================================
SELECT 
  id,
  email,
  full_name,
  role,
  verification_status,
  business_name,
  city,
  state,
  created_at
FROM profiles
ORDER BY created_at DESC
LIMIT 10;

-- 5. VERIFY SELLER VERIFICATION VIEW
-- ============================================
SELECT * FROM seller_verification_stats;

-- Expected:
-- Shows counts of pending, approved, rejected sellers and buyers

-- 6. TEST METADATA EXTRACTION (After creating new account)
-- ============================================
-- Replace 'your-email@example.com' with your test email
SELECT 
  id,
  email,
  raw_user_meta_data,
  created_at
FROM auth.users 
WHERE email = 'your-email@example.com';

-- Expected: raw_user_meta_data should contain all seller fields

-- 7. VERIFY PROFILE WAS CREATED WITH ALL DATA
-- ============================================
-- Replace 'your-email@example.com' with your test email
SELECT 
  p.id,
  p.email,
  p.full_name,
  p.phone,
  p.role,
  p.verification_status,
  p.nin,
  p.business_name,
  p.business_reg_number,
  p.street_address,
  p.city,
  p.state,
  p.created_at,
  u.raw_user_meta_data
FROM profiles p
JOIN auth.users u ON u.id = p.id
WHERE p.email = 'your-email@example.com';

-- Expected: All fields should be populated with data from signup form

-- 8. MANUALLY APPROVE A SELLER (FOR TESTING)
-- ============================================
/*
-- Get your user ID first
SELECT id, email, full_name FROM profiles WHERE email = 'your-email@example.com';

-- Then approve (replace 'user-id' and 'admin-id')
SELECT approve_seller(
  'user-id-here'::uuid, 
  'admin-id-here'::uuid
);

-- Or update directly
UPDATE profiles 
SET 
  verification_status = 'approved',
  verified_at = NOW()
WHERE email = 'your-email@example.com';
*/

-- 9. CHECK PRODUCT VERIFICATION SETUP
-- ============================================
SELECT * FROM product_verification_stats;

-- 10. LIST ALL CUSTOM FUNCTIONS
-- ============================================
SELECT 
  routine_name,
  routine_type,
  data_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name IN (
    'handle_new_user',
    'approve_seller',
    'reject_seller',
    'approve_product',
    'reject_product'
  );

-- Expected: All 5 functions should exist

-- ============================================
-- TROUBLESHOOTING
-- ============================================

-- If profile trigger is not working, recreate it:
/*
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Then re-run the create_profile_trigger.sql migration
*/

-- If seller fields are NULL, manually update:
/*
UPDATE profiles
SET 
  nin = 'test-nin',
  business_name = 'Test Business',
  business_reg_number = 'RC123456',
  street_address = '123 Test St',
  city = 'Lagos',
  state = 'Lagos'
WHERE email = 'your-email@example.com';
*/
