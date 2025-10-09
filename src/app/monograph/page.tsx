"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookText, Search, FileText } from "lucide-react";

export default function MonographPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Drug Monograph Lookup</h1>
          <p className="text-gray-600 mt-2">Access comprehensive drug information and monographs</p>
        </div>
        <Button className="flex items-center gap-2">
          <Search className="w-4 h-4" />
          Search Drugs
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookText className="w-5 h-5" />
              Drug Information Database
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <BookText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Drug Monograph Lookup</h3>
              <p className="text-gray-600 mb-4">Search for detailed drug information, indications, contraindications, and more</p>
              <Button className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Browse Monographs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
