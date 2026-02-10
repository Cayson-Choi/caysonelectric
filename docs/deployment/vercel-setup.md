# Vercel Environment Variables Setup

This guide explains how to set up environment variables for the CaysonElectric project on Vercel using the Vercel CLI.

## Steps

### 1. Login to Vercel
```bash
vercel login
```

### 2. Link Project
```bash
vercel link
```

### 3. Add Environment Variables

#### Supabase URL
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
```
Value: `https://beaufzsstxkmtzikkban.supabase.co`

#### Supabase Anon Key
```bash
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
```
Value: `sb_publishable_ykNCQz7CU-H_18I_bmTtVA_yIKYKSvN`

### 4. Redeploy
```bash
vercel --prod
```

## Notes

- These environment variables are required for the application to connect to Supabase
- Make sure to add them for all environments (production, preview, development) if needed
- After adding environment variables, a redeploy is required for changes to take effect
