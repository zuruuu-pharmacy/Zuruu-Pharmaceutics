"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[var(--c-primary)] text-white hover:bg-[var(--c-primary-700)]",
        secondary: "border-transparent bg-[var(--c-neutral-100)] text-[var(--c-neutral-900)] hover:bg-[var(--c-neutral-200)]",
        destructive: "border-transparent bg-[var(--c-error)] text-white hover:bg-[var(--c-error-600)]",
        success: "border-transparent bg-[var(--c-accent)] text-white hover:bg-[var(--c-accent-600)]",
        warning: "border-transparent bg-[var(--c-warning)] text-white hover:bg-[var(--c-warning-600)]",
        info: "border-transparent bg-[var(--c-info)] text-white hover:bg-[var(--c-info-600)]",
        outline: "border-[var(--c-neutral-300)] text-[var(--c-neutral-700)] hover:bg-[var(--c-neutral-100)]",
        // Status variants for pharmacy-specific use cases
        active: "border-transparent bg-[var(--c-accent)] text-white",
        inactive: "border-transparent bg-[var(--c-neutral-400)] text-white",
        pending: "border-transparent bg-[var(--c-warning)] text-white",
        completed: "border-transparent bg-[var(--c-accent)] text-white",
        cancelled: "border-transparent bg-[var(--c-error)] text-white",
        expired: "border-transparent bg-[var(--c-error-600)] text-white",
        low: "border-transparent bg-[var(--c-warning)] text-white",
        critical: "border-transparent bg-[var(--c-error)] text-white",
        inStock: "border-transparent bg-[var(--c-accent)] text-white",
        outOfStock: "border-transparent bg-[var(--c-error)] text-white"
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, icon, removable, onRemove, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1 h-3 w-3 rounded-full hover:bg-black/20 focus:outline-none focus:ring-1 focus:ring-white/50"
            aria-label="Remove badge"
          >
            <svg
              className="h-2 w-2"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <path d="m0 0 1 1 3-3 3 3 1-1-3-3 3-3-1-1-3 3-3-3z" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };