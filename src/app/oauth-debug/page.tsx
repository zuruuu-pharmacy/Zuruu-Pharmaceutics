"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, ExternalLink } from "lucide-react";

export default function OAuthDebugPage() {
  const [checks, setChecks] = useState<{[key: string]: 'pending' | 'pass' | 'fail' | 'error'}>({});
  const [envVars, setEnvVars] = useState<{[key: string]: string}>({});

  const requiredEnvVars = [
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET', 
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET'
  ];

  const requiredRedirectUris = [
    'https://zuruu-pharmaceutics.vercel.app/api/auth/callback/google',
    'http://localhost:3000/api/auth/callback/google'
  ];

  useEffect(() => {
    // Check environment variables (client-side only)
    const clientEnvVars: {[key: string]: string} = {};
    requiredEnvVars.forEach(varName => {
      // Note: Most env vars are server-side only, so we can't check them client-side
      // This is just for demonstration
      clientEnvVars[varName] = process.env[`NEXT_PUBLIC_${varName}`] || 'Server-side only';
    });
    setEnvVars(clientEnvVars);
  }, []);

  const runChecks = async () => {
    setChecks({});

    // Check 1: NextAuth route exists
    setChecks(prev => ({ ...prev, 'nextauth-route': 'pending' }));
    try {
      const response = await fetch('/api/auth/providers');
      if (response.ok) {
        const providers = await response.json();
        setChecks(prev => ({ ...prev, 'nextauth-route': 'pass' }));
      } else {
        setChecks(prev => ({ ...prev, 'nextauth-route': 'fail' }));
      }
    } catch (error) {
      setChecks(prev => ({ ...prev, 'nextauth-route': 'error' }));
    }

    // Check 2: Google provider configured
    setChecks(prev => ({ ...prev, 'google-provider': 'pending' }));
    try {
      const response = await fetch('/api/auth/providers');
      if (response.ok) {
        const providers = await response.json();
        if (providers.google) {
          setChecks(prev => ({ ...prev, 'google-provider': 'pass' }));
        } else {
          setChecks(prev => ({ ...prev, 'google-provider': 'fail' }));
        }
      } else {
        setChecks(prev => ({ ...prev, 'google-provider': 'error' }));
      }
    } catch (error) {
      setChecks(prev => ({ ...prev, 'google-provider': 'error' }));
    }

    // Check 3: Test OAuth callback URL
    setChecks(prev => ({ ...prev, 'callback-url': 'pending' }));
    try {
      // This will test if the callback URL is accessible
      const callbackUrl = `${window.location.origin}/api/auth/callback/google`;
      const response = await fetch(callbackUrl, { method: 'HEAD' });
      if (response.status === 405 || response.status === 200) {
        // 405 Method Not Allowed is expected for HEAD request to callback
        setChecks(prev => ({ ...prev, 'callback-url': 'pass' }));
      } else {
        setChecks(prev => ({ ...prev, 'callback-url': 'fail' }));
      }
    } catch (error) {
      setChecks(prev => ({ ...prev, 'callback-url': 'error' }));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'fail': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'error': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default: return <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'bg-green-100 text-green-800';
      case 'fail': return 'bg-red-100 text-red-800';
      case 'error': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            OAuth Configuration Debug
          </h1>
          <p className="text-gray-600">
            This page helps diagnose Google OAuth configuration issues
          </p>
        </div>

        <div className="grid gap-6">
          {/* Environment Variables Check */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Environment Variables
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {requiredEnvVars.map((varName) => (
                  <div key={varName} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-mono text-sm">{varName}</span>
                    <Badge variant="outline">
                      {envVars[varName] || 'Not accessible client-side'}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Most environment variables are server-side only. 
                  Check your Vercel dashboard → Settings → Environment Variables to verify these are set.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Required Redirect URIs */}
          <Card>
            <CardHeader>
              <CardTitle>Required Google OAuth Redirect URIs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {requiredRedirectUris.map((uri, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <code className="text-sm font-mono">{uri}</code>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Action Required:</strong> Go to Google Cloud Console → APIs & Services → Credentials → 
                  Your OAuth Client → Authorized redirect URIs and add both URLs above.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* System Checks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                System Checks
                <Button onClick={runChecks} variant="outline" size="sm">
                  Run Checks
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(checks['nextauth-route'])}
                    <span>NextAuth API Route</span>
                  </div>
                  <Badge className={getStatusColor(checks['nextauth-route'])}>
                    {checks['nextauth-route'] || 'Not checked'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(checks['google-provider'])}
                    <span>Google Provider Configuration</span>
                  </div>
                  <Badge className={getStatusColor(checks['google-provider'])}>
                    {checks['google-provider'] || 'Not checked'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(checks['callback-url'])}
                    <span>OAuth Callback URL</span>
                  </div>
                  <Badge className={getStatusColor(checks['callback-url'])}>
                    {checks['callback-url'] || 'Not checked'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Troubleshooting Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">1. Check Google Cloud Console</h4>
                  <p className="text-sm text-red-800">
                    Ensure your OAuth client has the exact redirect URIs listed above. 
                    Even a trailing slash difference will cause silent failures.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">2. Verify Vercel Environment Variables</h4>
                  <p className="text-sm text-blue-800">
                    In Vercel → Project → Settings → Environment Variables, ensure you have:
                    NEXTAUTH_URL, NEXTAUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">3. Check Vercel Logs</h4>
                  <p className="text-sm text-green-800">
                    After trying Google login, check Vercel → Functions → Logs to see the debugging output.
                    Look for the 🔐, 🔍, 👤, ✅, and ❌ emoji logs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Links */}
          <Card>
            <CardHeader>
              <CardTitle>Test Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  onClick={() => window.open('/api/auth/signin/google', '_blank')}
                  className="w-full"
                >
                  Test Google OAuth Flow
                </Button>
                <Button 
                  onClick={() => window.open('/api/auth/providers', '_blank')}
                  variant="outline"
                  className="w-full"
                >
                  Check Available Providers
                </Button>
                <Button 
                  onClick={() => window.open('/api/auth/session', '_blank')}
                  variant="outline"
                  className="w-full"
                >
                  Check Current Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
