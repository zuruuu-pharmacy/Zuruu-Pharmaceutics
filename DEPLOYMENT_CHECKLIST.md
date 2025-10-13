# 🚀 Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Local Development
- [x] Project builds successfully (`npm run build`)
- [x] Development server starts (`npm run dev`)
- [x] All dependencies installed
- [x] Environment variables configured in `.env.local`

### 2. Database Setup
- [ ] **Supabase database is active** (not paused)
- [ ] Database connection tested (`npx prisma db push`)
- [ ] Tables created successfully
- [ ] Database migration completed

### 3. Environment Variables
- [ ] All required variables documented in `VERCEL_ENV_VARIABLES.md`
- [ ] Supabase keys obtained from dashboard
- [ ] Google OAuth credentials configured
- [ ] Email service credentials ready

## 🚀 Vercel Deployment Steps

### Step 1: Connect Repository
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Import GitHub repository: `zuruuu-pharmacy/Zuruu-Pharmaceutics`
- [ ] Set root directory to `studio`
- [ ] Deploy

### Step 2: Configure Environment Variables
Add these variables in Vercel → Settings → Environment Variables:

#### Required Variables
```bash
DATABASE_URL=postgresql://postgres:XRpS2MltP0yutkHN@db.halzkqfbuxuwthbzekso.supabase.co:5432/postgres
NEXTAUTH_SECRET=your-production-secret-key-change-this
NEXTAUTH_URL=https://your-app-name.vercel.app
```

#### Optional Variables (if using these features)
```bash
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

# Supabase Client
NEXT_PUBLIC_SUPABASE_URL=https://halzkqfbuxuwthbzekso.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key-here

# Email Service
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

### Step 3: Database Setup
After deployment, run database setup:
```bash
# Option 1: Use the setup script
npm run db:setup

# Option 2: Manual setup
npx prisma generate
npx prisma db push
```

### Step 4: Verify Deployment
- [ ] Application loads without errors
- [ ] Authentication works (login/signup)
- [ ] Database operations work
- [ ] All features function correctly

## 🔧 Troubleshooting

### Common Issues

#### Database Connection Errors
- **Error**: `P1001: Can't reach database server`
- **Solution**: Check if Supabase database is paused and activate it

#### Environment Variable Errors
- **Error**: `Environment variable not found`
- **Solution**: Verify all variables are set in Vercel dashboard

#### Build Failures
- **Error**: TypeScript or compilation errors
- **Solution**: Run `npm run build` locally to identify issues

#### Authentication Issues
- **Error**: OAuth redirect errors
- **Solution**: Update Google Console with correct Vercel domain

### Getting Help

1. Check Vercel deployment logs
2. Review environment variables
3. Test database connectivity
4. Verify all services are active

## 📋 Post-Deployment

### Monitoring
- [ ] Set up Vercel analytics
- [ ] Monitor error logs
- [ ] Check database performance
- [ ] Test all user flows

### Security
- [ ] Use strong secrets in production
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Review database permissions
- [ ] Update OAuth redirect URIs

---

**🎉 Your application should now be successfully deployed on Vercel!**
