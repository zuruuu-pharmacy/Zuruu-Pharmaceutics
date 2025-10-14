"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus, Search } from "lucide-react";
import { NextAuthGuard } from "@/components/auth/nextauth-guard";

export default function PatientsPage() {
  return (
    <NextAuthGuard>
      <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600 mt-2">Manage patient records and select an active patient</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Patient
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Patient List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients found</h3>
              <p className="text-gray-600 mb-4">Start by adding your first patient to get started</p>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add First Patient
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </NextAuthGuard>
  );
}

