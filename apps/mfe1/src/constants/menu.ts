import type { Group } from "@/types/menus";
import { Book, Clock, House, LayoutList, ShieldX } from "lucide-react";
import { APP_ROUTES } from "./remote";

export const getMenuList = (pathname: string): Group[] => {
  return [
    {
      groupLabel: "HOST APP",
      menus: [
        {
          href: APP_ROUTES.HOME.key,
          label: "Trang chủ",
          icon: House,
          active: pathname === APP_ROUTES.HOME.key,
        },
        {
          href: APP_ROUTES.NOT_HAVE_PERMISSION.key,
          label: "Không có quyền",
          icon: ShieldX,
          active: pathname === APP_ROUTES.NOT_HAVE_PERMISSION.key,
        },
        {
          href: APP_ROUTES.DOCS.key,
          label: "Tài liệu",
          icon: Book,
          active: pathname === APP_ROUTES.DOCS.key,
        },
      ],
    },
    {
      groupLabel: "MICRO APP",
      menus: [
        {
          href: APP_ROUTES.MFE2.key,
          label: "Quản lý nhiệm vụ",
          icon: LayoutList,
          active: pathname === APP_ROUTES.MFE2.key,
        },
        {
          href: APP_ROUTES.FOCUS_HIVE.key,
          label: "Focus Hive",
          icon: Clock,
          active: pathname === APP_ROUTES.FOCUS_HIVE.key,
        },
      ],
    },
  ];
};
