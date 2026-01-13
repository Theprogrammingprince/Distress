-- ============================================
-- TRIGGERS FOR AUTO-NOTIFICATIONS
-- Run this in Supabase SQL Editor
-- ============================================

-- TRIGGER 1: Create notification when seller status changes
CREATE OR REPLACE FUNCTION notify_seller_status_change()
RETURNS TRIGGER AS $$
BEGIN
    -- Only trigger if verification_status changed
    IF OLD.verification_status IS DISTINCT FROM NEW.verification_status THEN
        -- Seller was rejected
        IF NEW.verification_status = 'rejected' THEN
            INSERT INTO notifications (user_id, type, title, message, data)
            VALUES (
                NEW.id,
                'seller_rejected',
                'Account Verification Rejected',
                'Your seller account verification has been rejected. Please review the reason and update your information to resubmit.',
                jsonb_build_object(
                    'rejection_reason', NEW.rejection_reason,
                    'rejected_at', NOW()
                )
            );
        -- Seller was approved
        ELSIF NEW.verification_status = 'approved' THEN
            INSERT INTO notifications (user_id, type, title, message, data)
            VALUES (
                NEW.id,
                'seller_approved',
                'Account Verified Successfully',
                'Congratulations! Your seller account has been verified. You can now create and sell products on Distress.',
                jsonb_build_object('verified_at', NOW())
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
-- TRIGGER 2: Auto-reset to pending when rejected seller updates profile
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
