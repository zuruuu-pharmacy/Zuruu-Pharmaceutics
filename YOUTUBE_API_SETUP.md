# YouTube API Setup for MOA Animation Search

To enable real video search functionality, you need to set up a YouTube Data API key.

## Steps to Get YouTube API Key:

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create a New Project or Select Existing**
   - Click "Select a project" → "New Project"
   - Name it "MOA Animation Search" (or any name you prefer)

3. **Enable YouTube Data API v3**
   - Go to "APIs & Services" → "Library"
   - Search for "YouTube Data API v3"
   - Click on it and press "Enable"

4. **Create API Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the generated API key

5. **Add API Key to Environment Variables**
   - Open your `.env.local` file
   - Add this line:
   ```
   YOUTUBE_API_KEY=your_api_key_here
   ```
   - Replace `your_api_key_here` with the actual API key you copied

6. **Restart Your Development Server**
   - Stop the current server (Ctrl+C)
   - Run `npm run dev` again

## Note:
- The API key is free for up to 10,000 requests per day
- If you don't set up the API key, the search will use fallback results
- The search will work with educational content and mechanism of action videos

## Testing:
1. Go to `/moa-animations` in your app
2. Search for any drug name (e.g., "aspirin", "metformin", "insulin")
3. You should see real YouTube videos related to your search
