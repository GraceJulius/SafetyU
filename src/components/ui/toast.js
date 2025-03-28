"use client";

import { toast as sonnerToast } from "sonner";

export function useToast() {
  return {
    toast: ({ title, description, variant, ...props }) => {
      sonnerToast(title, {
        description,
        // Map shadcn's "destructive" variant to sonner's "error"
        variant: variant === "destructive" ? "error" : variant,
        ...props,
      });
    },
  };
}