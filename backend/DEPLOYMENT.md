# Deployment Guide

## Prerequisites

1. **Supabase Account**: Create a project at [supabase.com](https://supabase.com)
2. **Supabase CLI**: Install globally
   ```bash
   npm install -g supabase
   ```

## Step 1: Initialize Supabase

```bash
cd backend
supabase init
```

## Step 2: Link to Your Project

```bash
supabase link --project-ref YOUR_PROJECT_REF
```

Get your project ref from your Supabase dashboard URL:
`https://app.supabase.com/project/YOUR_PROJECT_REF`

## Step 3: Run Migrations

```bash
supabase db push
```

This will create all tables, indexes, RLS policies, and seed data.

## Step 4: Deploy Edge Functions

Deploy all functions:
```bash
supabase functions deploy products
supabase functions deploy orders
supabase functions deploy cart
supabase functions deploy search
supabase functions deploy users
supabase functions deploy invoices
supabase functions deploy analytics
```

Or deploy all at once:
```bash
for func in products orders cart search users invoices analytics; do
  supabase functions deploy $func
done
```

## Step 5: Set Environment Variables

In your Supabase dashboard, go to Settings > Edge Functions and set:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Step 6: Configure Frontend

Create `.env.local` in the `distress` directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get these values from: Supabase Dashboard > Settings > API

## Step 7: Test Endpoints

Use the provided test script:
```bash
cd backend
deno run --allow-net --allow-env test-endpoints.ts
```

## Step 8: Deploy Frontend

```bash
cd distress
npm run build
```

Deploy to Vercel, Netlify, or your preferred platform.

## Monitoring

- **Supabase Dashboard**: Monitor database, auth, and edge functions
- **Logs**: View function logs in Supabase Dashboard > Edge Functions
- **React Query Devtools**: Available in development mode

## Troubleshooting

### CORS Issues
- Ensure `corsHeaders` are properly set in all edge functions
- Check that your frontend URL is allowed in Supabase settings

### Authentication Errors
- Verify environment variables are set correctly
- Check that RLS policies are enabled
- Ensure auth tokens are being passed in headers

### Database Errors
- Run migrations: `supabase db push`
- Check RLS policies: `supabase db diff`
- View logs: `supabase functions logs FUNCTION_NAME`

## Rollback

To rollback a migration:
```bash
supabase db reset
```

To redeploy a function:
```bash
supabase functions deploy FUNCTION_NAME --no-verify-jwt
```
