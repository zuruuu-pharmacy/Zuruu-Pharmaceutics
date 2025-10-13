# 🔐 Forgot Password & Reset Password System

## Overview

Your application has a complete, secure, and modern forgot password system that integrates seamlessly with NextAuth.js and Prisma. The system includes rate limiting, token cleanup, and beautiful UI components.

## ✅ Features Implemented

### 🔒 Security Features
- **Secure Token Generation**: Uses `crypto.randomBytes(32)` for cryptographically secure tokens
- **Time-Limited Tokens**: Tokens expire after 15 minutes
- **Rate Limiting**: Prevents spam by limiting reset requests per user (max 3 active tokens)
- **Token Cleanup**: Automatically removes expired tokens
- **Password Hashing**: Uses bcrypt with salt rounds of 10
- **One-Time Use**: Tokens are deleted after successful password reset

### 🎨 User Experience
- **Beautiful UI**: Modern, animated interface with Tailwind CSS and Framer Motion
- **Responsive Design**: Works perfectly on all devices
- **Loading States**: Smooth loading animations and feedback
- **Error Handling**: Comprehensive error messages and validation
- **Email Templates**: Professional HTML email templates

### 🔧 Technical Implementation
- **NextAuth.js Integration**: Fully compatible with existing authentication
- **Prisma Database**: Uses PostgreSQL with proper relationships
- **Email Service**: Nodemailer with SMTP configuration
- **TypeScript**: Fully typed for better development experience

## 📁 File Structure

```
src/
├── app/
│   ├── forgot-password/
│   │   └── page.tsx                 # Forgot password UI
│   ├── reset-password/
│   │   └── page.tsx                 # Reset password UI
│   └── api/
│       └── auth/
│           ├── forgot-password/
│           │   └── route.ts         # Forgot password API
│           └── reset-password/
│               └── route.ts         # Reset password API
├── lib/
│   ├── email.ts                     # Email service
│   ├── token-cleanup.ts             # Token management utilities
│   └── prisma.ts                    # Database client
└── prisma/
    └── schema.prisma                # Database schema
```

## 🗃️ Database Schema

```prisma
model User {
  id             Int      @id @default(autoincrement())
  name           String?
  email          String   @unique
  password       String?
  emailVerified  DateTime?
  image          String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  resetTokens    ResetToken[]
}

model ResetToken {
  id        Int      @id @default(autoincrement())
  token     String   @unique
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
  createdAt DateTime @default(now())
  expiresAt DateTime
}
```

## 🔄 User Flow

### 1. Forgot Password Request
1. User visits `/forgot-password`
2. Enters email address
3. System validates email format
4. Checks if user exists (without revealing existence)
5. Generates secure token (32 bytes, hex encoded)
6. Stores token in database with 15-minute expiration
7. Sends professional email with reset link
8. Shows success message

### 2. Password Reset
1. User clicks link in email
2. System validates token and expiration
3. Shows reset password form
4. User enters new password (min 6 characters)
5. System hashes password with bcrypt
6. Updates user password in database
7. Deletes used token
8. Redirects to login with success message

## 🛡️ Security Measures

### Token Security
- **Cryptographically Secure**: Uses `crypto.randomBytes(32)`
- **Unique**: Database constraint ensures uniqueness
- **Time-Limited**: 15-minute expiration
- **One-Time Use**: Deleted after successful reset

### Rate Limiting
- **Per-User Limit**: Maximum 3 active tokens per user
- **Automatic Cleanup**: Expired tokens are removed
- **Spam Prevention**: Prevents abuse of reset functionality

### Password Security
- **Bcrypt Hashing**: Salt rounds of 10
- **Minimum Length**: 6 characters required
- **Confirmation**: User must confirm new password

## 📧 Email Configuration

### Environment Variables
```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Email Template Features
- **Professional Design**: Branded HTML template
- **Responsive**: Works on all email clients
- **Clear Call-to-Action**: Prominent reset button
- **Security Information**: Explains 15-minute expiration
- **Fallback Link**: Text link if button doesn't work

## 🚀 API Endpoints

### POST `/api/auth/forgot-password`
**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (Success):**
```json
{
  "message": "If an account with that email exists, we've sent a password reset link."
}
```

**Response (Rate Limited):**
```json
{
  "error": "Too many reset requests. Please wait before requesting another reset."
}
```

### GET `/api/auth/reset-password?token=<token>`
**Response (Valid Token):**
```json
{
  "valid": true,
  "email": "user@example.com"
}
```

**Response (Invalid/Expired Token):**
```json
{
  "error": "Invalid reset token"
}
```

### POST `/api/auth/reset-password`
**Request:**
```json
{
  "token": "abc123...",
  "password": "newpassword"
}
```

**Response (Success):**
```json
{
  "message": "Password reset successfully"
}
```

## 🧪 Testing

### Local Development
1. Start development server: `npm run dev`
2. Visit `http://localhost:3000/forgot-password`
3. Enter a valid email address
4. Check console for email details (if using Ethereal)
5. Click reset link in email
6. Enter new password
7. Verify redirect to login page

### Production Testing
1. Deploy to Vercel
2. Set up real SMTP credentials
3. Test with real email addresses
4. Verify emails are delivered
5. Test token expiration (wait 15+ minutes)

## 🔧 Maintenance

### Token Cleanup
The system automatically cleans up expired tokens, but you can also run manual cleanup:

```typescript
import { cleanupExpiredTokens } from '@/lib/token-cleanup';

// Clean up expired tokens
const cleanedCount = await cleanupExpiredTokens();
console.log(`Cleaned up ${cleanedCount} expired tokens`);
```

### Monitoring
- Monitor email delivery rates
- Check for failed password reset attempts
- Review token cleanup logs
- Monitor rate limiting effectiveness

## 🎯 Best Practices

### Security
- ✅ Never reveal if email exists in system
- ✅ Use cryptographically secure tokens
- ✅ Implement rate limiting
- ✅ Hash passwords with bcrypt
- ✅ Set reasonable token expiration times

### User Experience
- ✅ Provide clear error messages
- ✅ Show loading states
- ✅ Use professional email templates
- ✅ Make forms accessible
- ✅ Provide fallback options

### Development
- ✅ Use TypeScript for type safety
- ✅ Implement proper error handling
- ✅ Log important events
- ✅ Test all user flows
- ✅ Monitor performance

## 🚀 Deployment Checklist

- [ ] Set up SMTP credentials in environment variables
- [ ] Test email delivery in production
- [ ] Verify database connections
- [ ] Test complete user flow
- [ ] Monitor error logs
- [ ] Set up email delivery monitoring

---

**Your forgot password system is production-ready and follows security best practices!** 🎉
