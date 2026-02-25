import { cva } from "class-variance-authority";

// Sidebar Container
export const sidebarContainerVariants = cva(
  "fixed top-0 left-0 z-20 h-screen w-72 transition-transform ease-in-out duration-100 contain-[layout_style] bg-[rgba(20,30,50,0.8)] dark:bg-[rgba(20,30,50,0.8)] backdrop-blur-[20px] border-r border-[rgba(255,255,255,0.1)] shadow-lg p-2",
  {
    variants: {
      state: {
        collapsed: "-translate-x-full",
        expanded: "translate-x-0",
      },
    },
    defaultVariants: {
      state: "expanded",
    },
  },
);

// Sidebar Inner Container (with glassmorphism)
export const sidebarInnerVariants = cva(
  "relative h-full flex flex-col overflow-y-auto",
);
