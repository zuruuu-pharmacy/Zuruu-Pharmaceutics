import { NextAuthGuard } from "@/components/auth/nextauth-guard";
import { DashboardClient } from "../dashboard-client";

export default function DashboardPage() {
  return (
    <NextAuthGuard>
      <DashboardClient />
    </NextAuthGuard>
  );
}

