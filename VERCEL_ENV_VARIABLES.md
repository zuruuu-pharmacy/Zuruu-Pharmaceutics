# Vercel Environment Variables Setup

## Required Environment Variables for Vercel Deployment

Copy these variables to your Vercel project settings:

### Database Configuration
```bash
DATABASE_URL=postgresql://postgres:XRpS2MltP0yutkHN@db.halzkqfbuxuwthbzekso.supabase.co:5432/postgres
```

### NextAuth Configuration
```bash
NEXTAUTH_SECRET=your-production-secret-key-change-this
NEXTAUTH_URL=https://your-app-name.vercel.app
```

### Google OAuth (Optional)
```bash
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

### Supabase Client (Optional - if using Supabase features)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://halzkqfbuxuwthbzekso.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key-here
```

### Email Configuration (Optional)
```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

## How to Add Variables in Vercel

1. Go to your Vercel project dashboard
2. Click on "Settings" tab
3. Click on "Environment Variables" in the sidebar
4. Add each variable with:
   - **Name**: The variable name (e.g., `DATABASE_URL`)
   - **Value**: The variable value
   - **Environment**: Select "Production" (and optionally "Preview" and "Development")

## Getting Supabase Keys

1. Go to your Supabase project dashboard
2. Click on "Settings" → "API"
3. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

## Getting Google OAuth Keys

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Select your OAuth 2.0 client
3. Copy:
   - **Client ID** → `GOOGLE_CLIENT_ID` and `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - **Client Secret** → `GOOGLE_CLIENT_SECRET`

## Important Notes

- Replace placeholder values with your actual credentials
- Never commit these values to version control
- Use strong, unique secrets for production
- Update `NEXTAUTH_URL` to match your actual Vercel domain
