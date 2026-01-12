-- Add new columns to products table for seller verification system
ALTER TABLE products
ADD COLUMN IF NOT EXISTS seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'NGN' CHECK (currency IN ('NGN', 'USD')),
ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS verified_by UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_verification_status ON products(verification_status);
CREATE INDEX IF NOT EXISTS idx_products_currency ON products(currency);

-- Update RLS policies for products

-- Drop existing policies to recreate them with new logic
DROP POLICY IF EXISTS "Anyone can view products" ON products;
DROP POLICY IF EXISTS "Only authenticated users can create products" ON products;
DROP POLICY IF EXISTS "Only authenticated users can update products" ON products;
DROP POLICY IF EXISTS "Only authenticated users can delete products" ON products;

-- Only show approved products to public (or all to super admin)
CREATE POLICY "Public can view approved products" ON products
  FOR SELECT USING (
    verification_status = 'approved' OR
    auth.uid() = seller_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'super_admin'
    )
  );

-- Sellers can create products (defaults to pending)
CREATE POLICY "Authenticated users can create products" ON products
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND
    auth.uid() = seller_id
  );

-- Sellers can update their own products (only if pending or rejected)
CREATE POLICY "Sellers can update their own pending/rejected products" ON products
  FOR UPDATE USING (
    auth.uid() = seller_id AND
    verification_status IN ('pending', 'rejected')
  );

-- Super admins can update any product (for verification)
CREATE POLICY "Super admins can update products for verification" ON products
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'super_admin'
    )
  );

-- Sellers can delete their own products
CREATE POLICY "Sellers can delete their own products" ON products
  FOR DELETE USING (
    auth.uid() = seller_id
  );

-- Super admins can delete any product
CREATE POLICY "Super admins can delete any product" ON products
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'super_admin'
    )
  );

-- Create a function to approve products
CREATE OR REPLACE FUNCTION approve_product(
  product_id UUID,
  admin_id UUID
)
RETURNS VOID AS $$
BEGIN
  UPDATE products
  SET 
    verification_status = 'approved',
    verified_at = NOW(),
    verified_by = admin_id,
    rejection_reason = NULL
  WHERE id = product_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to reject products
CREATE OR REPLACE FUNCTION reject_product(
  product_id UUID,
  admin_id UUID,
  reason TEXT
)
RETURNS VOID AS $$
BEGIN
  UPDATE products
  SET 
    verification_status = 'rejected',
    verified_at = NOW(),
    verified_by = admin_id,
    rejection_reason = reason
  WHERE id = product_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a view for admin dashboard to see product stats
CREATE OR REPLACE VIEW product_verification_stats AS
SELECT
  COUNT(*) FILTER (WHERE verification_status = 'pending') as pending_count,
  COUNT(*) FILTER (WHERE verification_status = 'approved') as approved_count,
  COUNT(*) FILTER (WHERE verification_status = 'rejected') as rejected_count,
  COUNT(*) as total_count
FROM products;
