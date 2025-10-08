"use client";

import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { AnimatePresence } from "framer-motion";

export function MainLayoutClient({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      <AnimatePresence mode="wait" initial={false}>
        {children}
      </AnimatePresence>
    </AppShell>
  );
}
