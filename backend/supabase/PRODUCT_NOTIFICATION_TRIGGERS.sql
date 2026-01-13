-- ============================================
-- PRODUCT NOTIFICATION TRIGGERS
-- Run this in Supabase SQL Editor
-- ============================================

-- Create notification when product is approved or rejected
CREATE OR REPLACE FUNCTION notify_product_status_change()
RETURNS TRIGGER AS $$
BEGIN
    -- Only trigger if verification_status changed
    IF OLD.verification_status IS DISTINCT FROM NEW.verification_status THEN
        -- Product was approved
        IF NEW.verification_status = 'approved' THEN
            INSERT INTO notifications (user_id, type, title, message, data)
            VALUES (
                NEW.seller_id,
                'seller_approved', -- Using existing type as a workaround
                'Product Approved',
                'Your product "' || NEW.name || '" has been approved and is now visible to buyers.',
                jsonb_build_object(
                    'product_id', NEW.id,
                    'product_name', NEW.name,
                    'approved_at', NOW()
                )
            );
        -- Product was rejected
        ELSIF NEW.verification_status = 'rejected' THEN
            INSERT INTO notifications (user_id, type, title, message, data)
            VALUES (
                NEW.seller_id,
                'seller_rejected', -- Using existing type as a workaround
                'Product Rejected',
                'Your product "' || NEW.name || '" has been rejected. Please review the reason and make necessary updates.',
                jsonb_build_object(
                    'product_id', NEW.id,
                    'product_name', NEW.name,
                    'rejection_reason', NEW.rejection_reason,
                    'rejected_at', NOW()
                )
            );
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for product status changes
DROP TRIGGER IF EXISTS on_product_status_change ON products;
CREATE TRIGGER on_product_status_change
    AFTER UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION notify_product_status_change();
