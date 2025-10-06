"use client";

import { RoleDashboard } from "./role-dashboard";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function Dashboard() {
  return (
    <AuthGuard>
      <RoleDashboard />
    </AuthGuard>
  );
}