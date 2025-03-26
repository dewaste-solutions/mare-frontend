"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // Importing utility for classnames

// Define button variants using cva (class variance authority)
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      color: {
        default: "bg-gray-800 text-white",
        primary: "bg-[#038167] text-white",
        secondary: "bg-green-600 text-white",
        outline: "border border-green-600 text-green-600 bg-transparent hover:bg-green-50", // ✅ Added "outline"
        ghost: "text-green-600 bg-transparent hover:bg-green-100",
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

// Define the button props including HTML button attributes
type ButtonProps = VariantProps<typeof buttonVariants> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ className, color, size, ...props }) => {
  return (
    <button
      className={cn(buttonVariants({ color, size }), className)}
      {...props}
    />
  );
};

export { Button, buttonVariants };
