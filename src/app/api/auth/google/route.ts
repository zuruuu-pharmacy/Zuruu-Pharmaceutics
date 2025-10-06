import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { cookies } from 'next/headers';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id_token } = body;

    if (!id_token) {
      return NextResponse.json(
        { ok: false, error: 'Missing id_token' },
        { status: 400 }
      );
    }

    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    
    if (!payload) {
      return NextResponse.json(
        { ok: false, error: 'Invalid token payload' },
        { status: 401 }
      );
    }

    // Check if email is verified by Google
    if (!payload.email_verified) {
      return NextResponse.json(
        { ok: false, error: 'Email not verified by Google' },
        { status: 403 }
      );
    }

    // Create user data from Google payload
    const userData = {
      id: payload.sub,
      firstName: payload.given_name || '',
      lastName: payload.family_name || '',
      email: payload.email || '',
      profilePicture: payload.picture || '',
      role: 'user',
      organization: 'Google User',
      experience: '1-3 years',
      createdAt: new Date().toISOString(),
      isVerified: true,
      profileComplete: true
    };

    // Create a simple session token (in production, use proper JWT or session store)
    const sessionToken = `google_${payload.sub}_${Date.now()}`;
    
    // Set HTTP-only cookie for session
    const cookieStore = cookies();
    cookieStore.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    return NextResponse.json({
      ok: true,
      user: {
        email: payload.email,
        name: payload.name,
        picture: payload.picture
      },
      userData
    });

  } catch (error) {
    console.error('Google token verification failed:', error);
    return NextResponse.json(
      { ok: false, error: 'Invalid token' },
      { status: 401 }
    );
  }
}

