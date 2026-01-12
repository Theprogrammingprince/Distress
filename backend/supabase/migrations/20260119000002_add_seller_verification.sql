-- Add verification fields to profiles table for seller/client verification
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS verified_by UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
ADD COLUMN IF NOT EXISTS business_name TEXT,
ADD COLUMN IF NOT EXISTS business_reg_number TEXT,
ADD COLUMN IF NOT EXISTS nin TEXT,
ADD COLUMN IF NOT EXISTS street_address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT;

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_profiles_verification_status ON profiles(verification_status);
CREATE INDEX IF NOT EXISTS idx_profiles_verified_by ON profiles(verified_by);

-- Update the handle_new_user function to set verification_status based on role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name, 
    phone, 
    role, 
    verification_status
  )
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'phone',
    COALESCE(NEW.raw_user_meta_data->>'role', 'buyer'),
    -- Buyers are auto-approved, clients/sellers need verification
    CASE 
      WHEN COALESCE(NEW.raw_user_meta_data->>'role', 'buyer') = 'buyer' THEN 'approved'
      ELSE 'pending'
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to approve seller/client
CREATE OR REPLACE FUNCTION approve_seller(
  seller_id UUID,
  admin_id UUID
)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET 
    verification_status = 'approved',
    verified_at = NOW(),
    verified_by = admin_id,
    rejection_reason = NULL
  WHERE id = seller_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to reject seller/client
CREATE OR REPLACE FUNCTION reject_seller(
  seller_id UUID,
  admin_id UUID,
  reason TEXT
)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET 
    verification_status = 'rejected',
    verified_at = NOW(),
    verified_by = admin_id,
    rejection_reason = reason
  WHERE id = seller_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a view for seller verification stats
CREATE OR REPLACE VIEW seller_verification_stats AS
SELECT
  COUNT(*) FILTER (WHERE role IN ('client', 'seller') AND verification_status = 'pending') as pending_count,
  COUNT(*) FILTER (WHERE role IN ('client', 'seller') AND verification_status = 'approved') as approved_count,
  COUNT(*) FILTER (WHERE role IN ('client', 'seller') AND verification_status = 'rejected') as rejected_count,
  COUNT(*) FILTER (WHERE role IN ('client', 'seller')) as total_count,
  COUNT(*) FILTER (WHERE role = 'buyer') as buyer_count
FROM profiles;

-- Update RLS policies to restrict access based on verification
-- Sellers can only create products if they're approved
DROP POLICY IF EXISTS "Authenticated users can create products" ON products;
CREATE POLICY "Approved sellers can create products" ON products
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND
    auth.uid() = seller_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('client', 'seller')
      AND profiles.verification_status = 'approved'
    )
  );

-- Add policy for super admin to view all profiles
CREATE POLICY "Super admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.role = 'super_admin'
    )
  );

-- Add policy for super admin to update any profile
CREATE POLICY "Super admins can update any profile" ON profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.role = 'super_admin'
    )
  );
