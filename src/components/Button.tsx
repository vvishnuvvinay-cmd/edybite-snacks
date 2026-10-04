import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "../lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  children: ReactNode;
  variant?: "primary" | "secondary" | "inverse";
};

export function Button({ asChild, className, variant = "primary", ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-primary text-primary-foreground hover:-translate-y-0.5 hover:bg-primary/90",
        variant === "secondary" &&
          "border border-foreground/20 bg-background text-foreground hover:border-foreground/50",
        variant === "inverse" &&
          "bg-background text-foreground hover:-translate-y-0.5 hover:bg-background/90",
        className,
      )}
      {...props}
    />
  );
}
