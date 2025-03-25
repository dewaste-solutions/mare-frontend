// src/components/ui/button.tsx

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";  // Importing the classnames utility

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      color: {
        default: "bg-gray-800 text-white",
        primary: "bg-[#038167] text-white",
        secondary: "bg-green-600 text-white",
      },
      size: {
        small: "px-2 py-1 text-xs",
        medium: "px-4 py-2 text-sm",
        large: "px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "medium",
    },
  }
);

type ButtonProps = VariantProps<typeof buttonVariants> & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className, color, size, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ color, size }), className)}
      {...props}
    />
  );
};

export { Button, buttonVariants };
