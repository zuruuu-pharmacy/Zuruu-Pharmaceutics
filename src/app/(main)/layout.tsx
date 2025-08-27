import { AppShell } from "@/components/app-shell";
import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
