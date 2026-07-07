"use client";

import { forwardRef, cloneElement, isValidElement, type ReactElement } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-250 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";
const variants = {
  primary:
    "bg-foreground text-primary-foreground hover:bg-foreground/90 hover:scale-[1.03] shadow-sm hover:shadow-md focus-visible:ring-foreground",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-[1.03] hover:shadow-sm focus-visible:ring-border",
  ghost:
    "hover:bg-accent hover:text-accent-foreground focus-visible:ring-border",
  outline:
    "border-2 border-border text-foreground bg-transparent hover:bg-muted hover:border-foreground hover:scale-[1.03] hover:shadow-sm focus-visible:ring-border",
  link:
    "text-foreground underline-offset-4 hover:underline focus-visible:ring-foreground",
  /* Design tokens — primary action */
  heroPrimary:
    "bg-[var(--color-action-primary-bg)] text-[var(--color-action-primary-text)] shadow-md hover:brightness-110 hover:shadow-lg hover:scale-[1.05] focus-visible:ring-accent",
  /* Design tokens — secondary action */
  heroSecondary:
    "bg-[var(--color-action-secondary-bg)] text-[var(--color-action-secondary-text)] border border-[var(--color-action-secondary-border)] shadow-sm hover:bg-[var(--color-action-secondary-hover-bg)] hover:border-[var(--color-action-secondary-border)] hover:shadow hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-border",
};
const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-8 text-base",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "link" | "heroPrimary" | "heroSecondary";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild, children, ...props }, ref) => {
    const classes = cn(base, variant && variants[variant], sizes[size], className);

    if (asChild && isValidElement(children)) {
      return cloneElement(children as ReactElement<{ className?: string }>, {
        className: cn((children as ReactElement<{ className?: string }>).props.className, classes),
      });
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
