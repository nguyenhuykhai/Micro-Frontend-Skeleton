import { cva } from "class-variance-authority";

export const sidebarToggleContainerVariants = cva("block");

export const sidebarToggleButtonVariants = cva(
  "rounded-lg w-10 h-10 transition-all duration-300 border-0 backdrop-blur-md shadow-lg",
  {
    variants: {
      variant: {
        glass: "bg-white/20 hover:bg-white/30 border border-white/20",
        solid: "bg-gray-800 hover:bg-gray-700",
      },
    },
    defaultVariants: {
      variant: "glass",
    },
  },
);

export const sidebarToggleIconVariants = cva(
  "h-5 w-5 transition-all ease-in-out duration-300",
  {
    variants: {
      color: {
        white: "text-white",
        dark: "text-gray-900",
      },
    },
    defaultVariants: {
      color: "white",
    },
  },
);
