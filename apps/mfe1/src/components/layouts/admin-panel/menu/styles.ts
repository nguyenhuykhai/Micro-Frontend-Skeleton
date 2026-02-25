import { cva } from "class-variance-authority";

// Container
export const menuContainerVariants = cva("w-full h-full flex flex-col gap-6");

export const menuUserProfileVariants = cva(
  "flex flex-row justify-between items-center pl-4 py-2",
);

export const menuUserProfileFlexVariants = cva(
  "flex items-center whitespace-nowrap gap-3",
);

// User
export const menuUserAvatarFlexVariants = cva("relative flex-shrink-0");

export const menuUserAvatarVariants = cva(
  "w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-amber-500/50 flex items-center justify-center text-white font-semibold",
);

export const menuUserFlexVariants = cva(
  "flex flex-col transition-all duration-300 opacity-100",
);

export const menuUserInfoVariants = cva(
  "text-sm font-semibold text-white leading-tight",
);

export const menuUserInfoSubVariants = cva("text-xs text-white/40");

export const menuUserAvatarButtonVariants = cva(
  "w-8 h-8 bg-white/10 hover:bg-white/20",
);

// Group Label
export const menuListVariants = cva("flex-1 flex flex-col space-y-1 gap-6");

export const menuGroupLabelVariants = cva(
  "whitespace-nowrap text-xs font-semibold text-white/40 uppercase tracking-[0.1em] px-4 pb-4",
);

export const menuItemLabelVariants = cva("text-base font-medium truncate");

// Menu Item Button
export const menuItemButtonVariants = cva(
  "w-full h-auto rounded-xl transition-all duration-200 text-white/70 hover:text-white hover:bg-white/10 justify-start",
  {
    variants: {
      state: {
        default: "",
        active: "bg-white/10 text-white",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

// Menu Item Icon
export const menuItemIconVariants = cva("text-white/70", {
  variants: {
    active: {
      true: "text-white",
      false: "",
    },
  },
  defaultVariants: {
    active: false,
  },
});

// Bottom Actions Container
export const menuBottomActionsVariants = cva("flex flex-col gap-6");

// Action Button (Settings)
export const menuActionButtonVariants = cva(
  "w-full h-auto justify-start py-2.5 px-4 rounded-xl transition-all duration-200 text-white/70 hover:text-white hover:bg-white/10",
);

// Action Text
export const menuActionTextVariants = cva("text-base font-medium");

// Sign Out Button
export const menuSignOutButtonVariants = cva(
  "w-full h-auto py-3 rounded-xl border border-white/20 text-white font-semibold text-base hover:bg-white/10 transition-all duration-200",
);

// Sign Out Text
export const menuSignOutTextVariants = cva("whitespace-nowrap");
