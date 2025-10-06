"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-context";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const themes = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ] as const;

  const currentTheme = themes.find(t => t.value === theme) || themes[0];
  const Icon = currentTheme.icon;

  return (
    <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-1">
      {themes.map((themeOption) => {
        const Icon = themeOption.icon;
        const isActive = theme === themeOption.value;
        
        return (
          <Button
            key={themeOption.value}
            variant={isActive ? "default" : "ghost"}
            size="sm"
            onClick={() => setTheme(themeOption.value as any)}
            className="relative h-8 w-8 p-0"
          >
            <motion.div
              animate={isActive ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Icon className="h-4 w-4" />
            </motion.div>
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-primary/20 rounded-md"
                layoutId="theme-indicator"
                transition={{ duration: 0.2 }}
              />
            )}
          </Button>
        );
      })}
    </div>
  );
}

