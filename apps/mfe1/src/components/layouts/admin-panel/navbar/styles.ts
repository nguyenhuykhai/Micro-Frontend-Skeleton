import { cva } from "class-variance-authority";

export const navbarContainerVariants = cva("sticky top-0 z-10 w-full", {
  variants: {
    isOpen: {
      true: "w-full",
      false: "w-full",
    },
  },
});
