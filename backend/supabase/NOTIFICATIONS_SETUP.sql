-- ============================================
-- STEP 1: CREATE NOTIFICATIONS TABLE
-- Run this FIRST
-- ============================================

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    read_at TIMESTAMPTZ
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 2: CREATE RLS POLICIES
-- Run this SECOND
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
DROP POLICY IF EXISTS "System can insert notifications" ON notifications;

-- Users can only see their own notifications
CREATE POLICY "Users can view own notifications"
ON notifications FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications"
ON notifications FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Anyone authenticated can insert notifications
CREATE POLICY "System can insert notifications"
ON notifications FOR INSERT
TO authenticated
WITH CHECK (true);

-- Users can delete their own notifications
CREATE POLICY "Users can delete own notifications"
ON notifications FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- ============================================
-- STEP 3: CREATE NOTIFICATION TRIGGER
-- Run this THIRD
-- ============================================

CREATE OR REPLACE FUNCTION notify_seller_status_change()
RETURNS TRIGGER AS $$
BEGIN
    -- Only trigger if verification_status changed
    IF OLD.verification_status IS DISTINCT FROM NEW.verification_status THEN
        -- Seller was rejected
        IF NEW.verification_status = 'rejected' THEN
            INSERT INTO notifications (user_id, type, title, message, metadata)
            VALUES (
                NEW.id,
                'verification_rejected',
                'Account Verification Rejected',
                'Your seller account verification has been rejected. Please review the reason below and update your information to resubmit.',
                jsonb_build_object(
                    'rejection_reason', NEW.rejection_reason,
                    'rejected_at', NOW()
                )
            );
        -- Seller was approved
        ELSIF NEW.verification_status = 'approved' THEN
            INSERT INTO notifications (user_id, type, title, message, metadata)
            VALUES (
                NEW.id,
                'verification_approved',
                'Account Verified Successfully',
                'Congratulations! Your seller account has been verified. You can now create and sell products on Distress.',
                jsonb_build_object('verified_at', NOW())
            );
        -- Seller status reset to pending (after updating profile)
        ELSIF NEW.verification_status = 'pending' AND OLD.verification_status = 'rejected' THEN
            INSERT INTO notifications (user_id, type, title, message, metadata)
            VALUES (
                NEW.id,
                'verification_pending',
                'Profile Resubmitted for Review',
                'Your updated profile has been submitted for review. Our team will verify your information within 24-48 hours.',
                jsonb_build_object('submitted_at', NOW())
            );
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for status changes
DROP TRIGGER IF EXISTS on_seller_status_change ON profiles;
CREATE TRIGGER on_seller_status_change
    AFTER UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION notify_seller_status_change();

-- ============================================
-- STEP 4: AUTO-RESET TO PENDING TRIGGER
-- Run this FOURTH
-- ============================================

CREATE OR REPLACE FUNCTION reset_rejected_to_pending()
RETURNS TRIGGER AS $$
BEGIN
    -- Only for rejected sellers who update key verification fields
    IF OLD.verification_status = 'rejected' THEN
        -- Check if any verification-relevant field changed
        IF (OLD.nin IS DISTINCT FROM NEW.nin) OR
           (OLD.business_name IS DISTINCT FROM NEW.business_name) OR
           (OLD.business_reg_number IS DISTINCT FROM NEW.business_reg_number) OR
           (OLD.street_address IS DISTINCT FROM NEW.street_address) OR
           (OLD.city IS DISTINCT FROM NEW.city) OR
           (OLD.state IS DISTINCT FROM NEW.state) OR
           (OLD.avatar_url IS DISTINCT FROM NEW.avatar_url) THEN
            -- Reset to pending for re-review
            NEW.verification_status := 'pending';
            NEW.rejection_reason := NULL;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to reset status on profile update
DROP TRIGGER IF EXISTS on_rejected_profile_update ON profiles;
CREATE TRIGGER on_rejected_profile_update
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION reset_rejected_to_pending();
