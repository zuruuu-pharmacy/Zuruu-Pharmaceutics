"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { SimpleTestDashboard } from "@/components/test-simple-dashboard";

export default function TestDashboardPage() {
  const router = useRouter();
  const [testResults, setTestResults] = useState<{[key: string]: string}>({});

  const testDashboards = [
    { name: "Patient Dashboard", route: "/patients", description: "Patient management" },
    { name: "Student Dashboard", route: "/academia-dashboard", description: "Academic dashboard" },
    { name: "Pharmacist Dashboard", route: "/retail-dashboard", description: "Retail pharmacy dashboard" },
    { name: "Industry Dashboard", route: "/industry-dashboard", description: "Industry dashboard" },
    { name: "Hospital Dashboard", route: "/hospital-dashboard", description: "Hospital dashboard" },
  ];

  const testDashboard = async (name: string, route: string) => {
    try {
      setTestResults(prev => ({ ...prev, [name]: "Testing..." }));
      
      // Try to navigate to the dashboard
      router.push(route);
      
      setTestResults(prev => ({ ...prev, [name]: "✅ Navigated successfully" }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, [name]: `❌ Error: ${error}` }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Test Page</h1>
        
        <div className="grid gap-6">
          {testDashboards.map((dashboard) => (
            <Card key={dashboard.name}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{dashboard.name}</h3>
                    <p className="text-gray-600 text-sm">{dashboard.description}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`text-sm font-medium ${
                      testResults[dashboard.name]?.includes('✅') ? 'text-green-600' :
                      testResults[dashboard.name]?.includes('❌') ? 'text-red-600' :
                      testResults[dashboard.name]?.includes('Testing') ? 'text-blue-600' :
                      'text-gray-500'
                    }`}>
                      {testResults[dashboard.name] || "Not tested"}
                    </span>
                    <Button 
                      onClick={() => testDashboard(dashboard.name, dashboard.route)}
                      variant="outline"
                      size="sm"
                    >
                      Test
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Route: <code className="bg-gray-100 px-2 py-1 rounded">{dashboard.route}</code>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside text-blue-800 space-y-1">
            <li>Click "Test" on each dashboard to navigate to it</li>
            <li>Check if the dashboard loads properly</li>
            <li>Look for any error messages or blank screens</li>
            <li>Report any issues you find</li>
          </ol>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Simple Dashboard Test</h2>
          <SimpleTestDashboard />
        </div>

        <div className="mt-6">
          <Button onClick={() => router.push('/')} variant="outline">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
