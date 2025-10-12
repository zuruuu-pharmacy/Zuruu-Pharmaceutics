"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, FileText, Save } from "lucide-react";

export default function PatientHistoryPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient History Form</h1>
          <p className="text-gray-600 mt-2">Add or edit detailed patient history</p>
        </div>
        <Button className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Form
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Patient History Form</h3>
              <p className="text-gray-600 mb-4">This form will be implemented with comprehensive patient data collection</p>
              <Button className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Start Form
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

