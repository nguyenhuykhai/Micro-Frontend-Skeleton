import { cva } from "class-variance-authority";

export const gradientBackgroundVariants = cva(
  "fixed inset-0 pointer-events-none",
  {
    variants: {
      gradient: {
        default:
          "bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5)_0%,transparent_30%)]",
        strong:
          "bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5)_0%,transparent_50%)]",
      },
    },
    defaultVariants: {
      gradient: "default",
    },
  },
);
