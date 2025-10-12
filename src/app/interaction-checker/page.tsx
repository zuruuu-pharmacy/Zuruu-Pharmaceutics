"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlaskConical, AlertTriangle, CheckCircle } from "lucide-react";

export default function InteractionCheckerPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Interaction Engine</h1>
          <p className="text-gray-600 mt-2">Check for multi-drug interactions and safety alerts</p>
        </div>
        <Button className="flex items-center gap-2">
          <FlaskConical className="w-4 h-4" />
          Check Interactions
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5" />
              Drug Interaction Checker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <FlaskConical className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Interaction Engine</h3>
              <p className="text-gray-600 mb-4">Analyze potential drug-drug, drug-food, and drug-condition interactions</p>
              <div className="flex justify-center gap-4">
                <Button className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Check Interactions
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Safety Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

