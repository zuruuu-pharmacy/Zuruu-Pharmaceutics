# Google OAuth Setup Instructions

## 1. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Choose **Web application**
6. Add **Authorized JavaScript origins**: `http://localhost:9002`
7. Copy the **Client ID** (looks like `xxxx.apps.googleusercontent.com`)

## 2. Environment Variables

Create a `.env.local` file in your project root:

```bash
# Google OAuth Configuration
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com

# Next.js Configuration
NODE_ENV=development
```

Replace `YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com` with your actual Client ID from Google Cloud Console.

## 3. Test the Implementation

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:9002/auth/login`

3. You should see:
   - A Google OAuth button rendered by Google Identity Services
   - A fallback Google button (in case the first one doesn't load)

## 4. How It Works

### Frontend (Login Page)
- Loads Google Identity Services script
- Renders Google OAuth button
- Handles credential response
- Sends ID token to backend for verification

### Backend (API Route)
- Verifies Google ID token using `google-auth-library`
- Extracts user information from token payload
- Creates user session with HTTP-only cookie
- Returns user data for frontend

### Authentication Flow
1. User clicks Google button
2. Google shows OAuth consent screen
3. User grants permissions
4. Google returns ID token to frontend
5. Frontend sends token to `/api/auth/google`
6. Backend verifies token and creates session
7. User is redirected to dashboard

## 5. Troubleshooting

### Common Issues:

1. **"Invalid origin" error**
   - Make sure `http://localhost:9002` is exactly added in Google Cloud Console
   - Check for typos in the URL

2. **"response.credential is undefined"**
   - Ensure Google Identity Services script is loaded
   - Check browser console for errors

3. **"Token verify failed"**
   - Verify `GOOGLE_CLIENT_ID` matches exactly in both frontend and backend
   - Check that the Client ID is correct in Google Cloud Console

4. **Button not rendering**
   - Check if `g_id_button` div exists in the DOM
   - Verify Google script is loaded before initialization

### Testing Tips:
- Use incognito mode to avoid cached sessions
- Check browser developer tools for console errors
- Verify network requests in Network tab
- Test with different Google accounts

## 6. Production Considerations

For production deployment:

1. **HTTPS Required**: Google OAuth requires HTTPS in production
2. **Secure Cookies**: Set `secure: true` for cookies in production
3. **Environment Variables**: Use proper secret management
4. **Domain Configuration**: Update authorized origins in Google Cloud Console
5. **Session Management**: Consider using Redis or database for session storage

## 7. Security Notes

- ID tokens are JWT tokens that contain user information
- Always verify tokens on the backend
- Use HTTP-only cookies for session management
- Implement proper session expiration
- Consider implementing refresh token rotation

