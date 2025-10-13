# Environment Variables Configuration

This document outlines all the environment variables required for the Zuruu Pharmaceutics application.

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Database Configuration
```bash
# PostgreSQL database URL for production
# Format: postgresql://username:password@host:port/database
DATABASE_URL="postgresql://username:password@host:port/database"
```

### NextAuth.js Configuration
```bash
# Secret key for NextAuth.js (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET="your-nextauth-secret-key-here"

# Your app's URL (production URL for Vercel deployment)
NEXTAUTH_URL="https://your-app-name.vercel.app"
```

### Google OAuth Configuration
```bash
# Get these from Google Cloud Console
# https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Public Google Client ID (for frontend)
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
```

### Email Configuration (SMTP)
```bash
# SMTP settings for password reset emails
# Recommended providers: SendGrid, Mailgun, AWS SES, or Gmail
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
```

### Optional AI/ML Configuration
```bash
# OpenAI API Key (if using OpenAI features)
OPENAI_API_KEY="your-openai-api-key"

# Google AI API Key (if using Google AI features)
GOOGLE_AI_API_KEY="your-google-ai-api-key"
```

### Optional Firebase Configuration
```bash
# Firebase project configuration
NEXT_PUBLIC_FIREBASE_API_KEY="your-firebase-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
```

### Production Settings
```bash
# Node environment
NODE_ENV="production"
```

## Vercel Deployment Setup

### 1. Environment Variables in Vercel
- Go to your Vercel project dashboard
- Navigate to "Settings" → "Environment Variables"
- Add each variable with its production value
- Make sure to set the environment to "Production"

### 2. PostgreSQL Database Setup
For production, use one of these PostgreSQL providers:
- **Vercel Postgres** (recommended for Vercel deployments)
- **Neon** (serverless PostgreSQL)
- **Supabase** (PostgreSQL with additional features)
- **Railway** (simple PostgreSQL hosting)

Get the connection string from your provider and add it as `DATABASE_URL` in Vercel.

### 3. Email Service Setup
For production email sending, use:
- **SendGrid** (recommended)
- **Mailgun**
- **AWS SES**
- **Resend**

Update the `EMAIL_*` variables with your production email service credentials.

### 4. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Update your OAuth 2.0 client:
   - Add your production domain to "Authorized JavaScript origins"
   - Add `https://your-domain.vercel.app/api/auth/callback/google` to "Authorized redirect URIs"
3. Update `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in Vercel

### 5. Security Notes
- Never commit `.env.local` to version control
- Use strong, unique secrets for production
- Regularly rotate your API keys and secrets
- Use environment-specific configurations

## Local Development Setup

1. Copy the environment variables above to `.env.local`
2. Replace placeholder values with your actual credentials
3. For local development, you can use SQLite by changing the `DATABASE_URL` to:
   ```bash
   DATABASE_URL="file:./dev.db"
   ```
4. Run `npm run dev` to start the development server

## Troubleshooting

### Common Issues
1. **Database connection errors**: Verify your `DATABASE_URL` format
2. **OAuth errors**: Check that redirect URIs match your domain
3. **Email sending failures**: Verify SMTP credentials and firewall settings
4. **Build failures**: Ensure all required environment variables are set

### Testing Environment Variables
You can test your configuration by running:
```bash
npm run build
```

This will verify that all required environment variables are properly configured.
