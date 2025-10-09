"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, Search, AlertCircle } from "lucide-react";

export default function SymptomCheckerPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Symptom Checker</h1>
          <p className="text-gray-600 mt-2">AI-powered symptom analysis and recommendations</p>
        </div>
        <Button className="flex items-center gap-2">
          <Search className="w-4 h-4" />
          Analyze Symptoms
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5" />
              Symptom Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Symptom Checker</h3>
              <p className="text-gray-600 mb-4">Enter your symptoms to get AI-powered analysis and recommendations</p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 text-yellow-800">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-semibold">Important:</span>
                </div>
                <p className="text-yellow-700 text-sm mt-1">
                  This tool is for informational purposes only and should not replace professional medical advice.
                </p>
              </div>
              <Button className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Start Symptom Check
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
