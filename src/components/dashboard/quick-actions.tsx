"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface QuickAction {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  color: string;
  badge?: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {actions.map((action, index) => (
          <motion.div
            key={action.href}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={action.href} passHref>
              <Card className="hover:shadow-md transition-all duration-200 cursor-pointer group">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <action.icon className={`h-4 w-4 ${action.color}`} />
                    <CardTitle className="text-sm group-hover:text-primary transition-colors">
                      {action.title}
                    </CardTitle>
                    {action.badge && (
                      <Badge variant="outline" className="text-xs">
                        {action.badge}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
