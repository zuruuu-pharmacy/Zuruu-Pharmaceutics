"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-[44px] min-w-[44px]",
  {
    variants: {
      variant: {
        primary: "bg-[var(--c-primary)] text-white hover:bg-[var(--c-primary-700)] focus-visible:ring-[var(--c-primary-500)]",
        secondary: "bg-[var(--c-neutral-100)] text-[var(--c-neutral-900)] hover:bg-[var(--c-neutral-200)] focus-visible:ring-[var(--c-neutral-500)]",
        accent: "bg-[var(--c-accent)] text-white hover:bg-[var(--c-accent-600)] focus-visible:ring-[var(--c-accent-500)]",
        outline: "border border-[var(--c-neutral-300)] bg-transparent text-[var(--c-neutral-700)] hover:bg-[var(--c-neutral-50)] focus-visible:ring-[var(--c-neutral-500)]",
        ghost: "bg-transparent text-[var(--c-neutral-700)] hover:bg-[var(--c-neutral-100)] focus-visible:ring-[var(--c-neutral-500)]",
        destructive: "bg-[var(--c-error)] text-white hover:bg-[var(--c-error-600)] focus-visible:ring-[var(--c-error-500)]",
        success: "bg-[var(--c-accent)] text-white hover:bg-[var(--c-accent-600)] focus-visible:ring-[var(--c-accent-500)]",
        warning: "bg-[var(--c-warning)] text-white hover:bg-[var(--c-warning-600)] focus-visible:ring-[var(--c-warning-500)]",
        info: "bg-[var(--c-info)] text-white hover:bg-[var(--c-info-600)] focus-visible:ring-[var(--c-info-500)]"
      },
      size: {
        sm: "h-8 px-3 text-xs min-h-[32px] min-w-[32px]",
        md: "h-10 px-4 text-sm min-h-[40px] min-w-[40px]",
        lg: "h-12 px-6 text-base min-h-[48px] min-w-[48px]",
        xl: "h-14 px-8 text-lg min-h-[56px] min-w-[56px]",
        icon: "h-10 w-10 min-h-[40px] min-w-[40px]"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };