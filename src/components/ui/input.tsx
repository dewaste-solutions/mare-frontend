// src/components/ui/input.tsx

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";  // Importing the classnames utility

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn("px-4 py-2 border border-gray-300 rounded-md", className)}
      {...props}
    />
  )
);

Input.displayName = "Input";

export { Input };
