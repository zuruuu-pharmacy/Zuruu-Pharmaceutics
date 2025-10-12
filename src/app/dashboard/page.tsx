import { AuthGuard } from "@/components/auth/auth-guard";
import { DashboardClient } from "../dashboard-client";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardClient />
    </AuthGuard>
  );
}

