# Vercel Deployment Guide

This guide will help you deploy the Zuruu Pharmaceutics application to Vercel with all necessary configurations.

## ✅ Pre-Deployment Checklist

- [x] **Prisma Schema**: Updated to use PostgreSQL for production
- [x] **Package.json**: Added `postinstall` script for Prisma client generation
- [x] **Environment Variables**: All credentials externalized (no hardcoded values)
- [x] **Build Process**: Verified to work with `npm run build`
- [x] **Database Models**: User and ResetToken models properly configured

## 🚀 Deployment Steps

### 1. Connect Repository to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository: `zuruuu-pharmacy/Zuruu-Pharmaceutics`
4. Set the **Root Directory** to `studio`
5. Click "Deploy"

### 2. Configure Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables for **Production** environment:

#### Required Variables
```bash
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-app-name.vercel.app

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

# Email (SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Production
NODE_ENV=production
```

### 3. Set Up PostgreSQL Database

Choose one of these options:

#### Option A: Vercel Postgres (Recommended)
1. In Vercel dashboard, go to **Storage** tab
2. Click "Create Database" → "Postgres"
3. Copy the connection string to `DATABASE_URL`

#### Option B: External Provider
- **Neon**: [neon.tech](https://neon.tech)
- **Supabase**: [supabase.com](https://supabase.com)
- **Railway**: [railway.app](https://railway.app)

### 4. Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Select your OAuth 2.0 client
3. Add to **Authorized JavaScript origins**:
   ```
   https://your-app-name.vercel.app
   ```
4. Add to **Authorized redirect URIs**:
   ```
   https://your-app-name.vercel.app/api/auth/callback/google
   ```

### 5. Set Up Email Service

For production email sending, use one of these:

#### SendGrid (Recommended)
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create an API key
3. Update environment variables:
   ```bash
   EMAIL_HOST=smtp.sendgrid.net
   EMAIL_PORT=587
   EMAIL_USER=apikey
   EMAIL_PASS=your-sendgrid-api-key
   ```

#### Gmail (Alternative)
1. Enable 2-factor authentication
2. Generate an app password
3. Use your Gmail credentials

### 6. Deploy and Test

1. **Redeploy** your application after setting environment variables
2. **Test the deployment**:
   - Visit your Vercel URL
   - Test user registration/login
   - Test Google OAuth
   - Test password reset functionality
   - Verify database connections

## 🔧 Post-Deployment Setup

### Database Migration
After deployment, run database migrations:

```bash
# Install Vercel CLI
npm i -g vercel

# Run migrations
vercel env pull .env.local
npx prisma db push
```

### Verify Deployment
1. **Authentication**: Test login/signup flows
2. **Database**: Verify data persistence
3. **Email**: Test password reset emails
4. **OAuth**: Test Google login
5. **Performance**: Check build logs for any errors

## 🐛 Troubleshooting

### Common Issues

#### Build Failures
- **Error**: "Property 'resetToken' does not exist"
- **Solution**: The `postinstall` script ensures Prisma client is generated

#### Database Connection Errors
- **Error**: "Can't reach database server"
- **Solution**: Verify `DATABASE_URL` format and credentials

#### OAuth Errors
- **Error**: "redirect_uri_mismatch"
- **Solution**: Update Google Console with correct Vercel URL

#### Email Sending Failures
- **Error**: "Authentication failed"
- **Solution**: Verify SMTP credentials and firewall settings

### Debugging Steps

1. **Check Vercel Function Logs**:
   - Go to Vercel dashboard → Functions tab
   - Look for error messages in logs

2. **Verify Environment Variables**:
   - Ensure all variables are set for Production
   - Check for typos in variable names

3. **Test Database Connection**:
   ```bash
   npx prisma db push
   ```

## 📊 Performance Optimization

The application is already optimized for production:

- ✅ **Prisma Client**: Generated during build
- ✅ **Next.js**: Optimized build configuration
- ✅ **Environment Variables**: Properly externalized
- ✅ **Database**: PostgreSQL for production scalability

## 🔒 Security Checklist

- ✅ **Secrets**: All credentials in environment variables
- ✅ **HTTPS**: Vercel provides SSL certificates
- ✅ **Authentication**: NextAuth.js with secure defaults
- ✅ **Database**: PostgreSQL with connection security
- ✅ **Email**: SMTP with authentication

## 📞 Support

If you encounter issues:

1. Check the [Environment Variables Guide](./ENVIRONMENT_VARIABLES.md)
2. Review Vercel deployment logs
3. Verify all environment variables are set correctly
4. Test database connectivity

---

**Your application is now ready for production deployment on Vercel!** 🎉
