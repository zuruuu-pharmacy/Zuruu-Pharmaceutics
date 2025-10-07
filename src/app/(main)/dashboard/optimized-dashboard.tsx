"use client";

import { Suspense, lazy } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMode } from "@/contexts/mode-context";
import { usePatient } from "@/contexts/patient-context";
import { 
  pharmacistTools, 
  studentTools, 
  gameTools, 
  calculatorTools, 
  quickActions 
} from "./dashboard-sections";

// Lazy load heavy components
const ToolCards = lazy(() => import("@/components/dashboard/tool-cards").then(mod => ({ default: mod.ToolCards })));
const QuickActions = lazy(() => import("@/components/dashboard/quick-actions").then(mod => ({ default: mod.QuickActions })));
const LifestyleSuggestions = lazy(() => import("./lifestyle-suggestions").then(mod => ({ default: mod.LifestyleSuggestions })));

// Loading skeleton components
function ToolCardsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-6 w-6 rounded" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-16 mt-1" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4 mt-1" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function QuickActionsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-32" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-12" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Skeleton className="h-3 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function OptimizedDashboard() {
  const { mode } = useMode();
  const { getActivePatientRecord } = usePatient();
  const activePatient = getActivePatientRecord()?.history;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Pharmacy Education Platform
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Comprehensive tools for pharmacists, students, and healthcare professionals
        </p>
        {activePatient && (
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Active Patient:</strong> {activePatient.name}
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions - Load immediately */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<QuickActionsSkeleton />}>
            <QuickActions actions={quickActions} />
          </Suspense>
        </CardContent>
      </Card>

      {/* Mode-specific tools */}
      {mode === "pharmacist" && (
        <Suspense fallback={<ToolCardsSkeleton />}>
          <ToolCards 
            tools={pharmacistTools} 
            title="Pharmacist Tools" 
            description="Professional tools for patient care and medication management"
          />
        </Suspense>
      )}

      {mode === "student" && (
        <Suspense fallback={<ToolCardsSkeleton />}>
          <ToolCards 
            tools={studentTools} 
            title="Student Tools" 
            description="Educational resources and study aids for pharmacy students"
          />
        </Suspense>
      )}

      {/* Always show these sections */}
      <Suspense fallback={<ToolCardsSkeleton />}>
        <ToolCards 
          tools={gameTools} 
          title="Learning Games" 
          description="Interactive games and puzzles to make learning fun and engaging"
        />
      </Suspense>

      <Suspense fallback={<ToolCardsSkeleton />}>
        <ToolCards 
          tools={calculatorTools} 
          title="Calculators" 
          description="Specialized calculators for pharmacy calculations and formulations"
        />
      </Suspense>

      {/* Lifestyle Suggestions - Load last */}
      <Suspense fallback={<div className="h-32 bg-muted rounded-lg animate-pulse" />}>
        <LifestyleSuggestions patientHistory={activePatient} />
      </Suspense>
    </div>
  );
}
