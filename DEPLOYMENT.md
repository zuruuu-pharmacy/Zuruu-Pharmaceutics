# Deployment Guide

## Vercel Deployment

This Next.js application is configured for deployment on Vercel.

### Environment Variables Required

Set the following environment variables in your Vercel dashboard:

```
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your_nextauth_secret_here
NODE_ENV=production
```

### Deployment Steps

1. Connect your GitHub repository to Vercel
2. Set the environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Build Configuration

- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Features

- ✅ Static Site Generation (SSG)
- ✅ Server-Side Rendering (SSR)
- ✅ API Routes
- ✅ TypeScript Support
- ✅ Tailwind CSS
- ✅ Responsive Design
