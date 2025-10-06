import type { ReactNode } from "react";

export default function HospitalDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      {children}
    </div>
  );
}
