"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CTARippleAnimation } from "./lottie-micro-animations";

interface CTAButtonWithRippleProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  disabled?: boolean;
}

export function CTAButtonWithRipple({ 
  children, 
  onClick, 
  variant = "default",
  size = "default",
  className = "",
  disabled = false
}: CTAButtonWithRippleProps) {
  const [showRipple, setShowRipple] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    
    // Trigger ripple effect
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 600);
    
    // Call original onClick
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="relative inline-block">
      <Button
        onClick={handleClick}
        variant={variant}
        size={size}
        disabled={disabled}
        className={`relative overflow-hidden ${className}`}
      >
        {children}
        
        {/* Ripple Effect */}
        {showRipple && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-4 h-4 bg-white/30 rounded-full"></div>
          </motion.div>
        )}
      </Button>
    </div>
  );
}
