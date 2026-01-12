-- Create a function to auto-create profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
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
    state
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
    END,
    NEW.raw_user_meta_data->>'nin',
    NEW.raw_user_meta_data->>'business_name',
    NEW.raw_user_meta_data->>'business_reg_number',
    NEW.raw_user_meta_data->>'street_address',
    NEW.raw_user_meta_data->>'city',
    NEW.raw_user_meta_data->>'state'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to run the function after a new user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO supabase_auth_admin;
GRANT ALL ON public.profiles TO supabase_auth_admin;
