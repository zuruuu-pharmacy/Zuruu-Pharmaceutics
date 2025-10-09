"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Zap, Target } from "lucide-react";

export default function DoseCalculatorPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Dose Calculator</h1>
          <p className="text-gray-600 mt-2">Calculate patient-specific dosages with AI precision</p>
        </div>
        <Button className="flex items-center gap-2">
          <Calculator className="w-4 h-4" />
          Calculate Dose
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Dose Calculation Tool
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Dose Calculator</h3>
              <p className="text-gray-600 mb-4">Calculate accurate dosages based on patient weight, age, and medical conditions</p>
              <div className="flex justify-center gap-4">
                <Button className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Quick Calculate
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Advanced Mode
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
