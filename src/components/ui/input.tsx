"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  "flex w-full rounded-lg border border-[var(--c-neutral-300)] bg-[var(--c-surface)] px-3 py-2 text-sm placeholder:text-[var(--c-neutral-500)] focus:border-[var(--c-primary-500)] focus:outline-none focus:ring-2 focus:ring-[var(--c-primary-500)] focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
  {
    variants: {
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base"
      },
      variant: {
        default: "",
        error: "border-[var(--c-error-500)] focus:border-[var(--c-error-500)] focus:ring-[var(--c-error-500)]",
        success: "border-[var(--c-accent-500)] focus:border-[var(--c-accent-500)] focus:ring-[var(--c-accent-500)]"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default"
    }
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, variant, label, error, helperText, leftIcon, rightIcon, required, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const inputVariant = hasError ? "error" : variant;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--c-neutral-700)] mb-1"
          >
            {label}
            {required && <span className="text-[var(--c-error-500)] ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--c-neutral-500)]">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            className={cn(
              inputVariants({ size, variant: inputVariant }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--c-neutral-500)]">
              {rightIcon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <div className="mt-1">
            {error && (
              <p className="text-sm text-[var(--c-error-600)]" role="alert">
                {error}
              </p>
            )}
            {!error && helperText && (
              <p className="text-sm text-[var(--c-neutral-600)]">
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };