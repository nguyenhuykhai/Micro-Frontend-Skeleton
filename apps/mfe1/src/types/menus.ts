import type { LucideIcon } from "lucide-react";

export type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
};

export type Group = {
  groupLabel: string;
  menus: Menu[];
};
