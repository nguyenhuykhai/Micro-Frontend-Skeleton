import { Link } from "react-router";
import { Ellipsis, LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";

import { cn } from "@repo/ui/lib/utils";
import { getMenuList } from "@/constants/menu";
import { Button } from "@repo/ui";
import { ScrollArea } from "@repo/ui";
import { CollapseMenuButton } from "@/components/layouts/admin-panel/collapse-menu-button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@repo/ui";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const { pathname } = useLocation();
  const menuList = getMenuList(pathname);

  return (
    <ScrollArea invisibleScrollbar className="[&>div>div[style]]:!block">
      <nav className="h-full w-full flex flex-col">
        {/* User Profile */}
        <div
          className={cn(
            "flex items-center gap-3 px-4 py-2 mb-4",
            isOpen === false && "justify-center px-3",
          )}
        >
          {/* Avatar with online status */}
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-amber-500/50 flex items-center justify-center text-white font-semibold">
              AU
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[rgba(20,30,50,0.8)]" />
          </div>

          {/* User Info */}
          <div
            className={cn(
              "flex flex-col transition-all duration-300",
              isOpen === false
                ? "opacity-0 w-0 overflow-hidden"
                : "opacity-100",
            )}
          >
            <span className="text-sm font-semibold text-white leading-tight">
              Animesh User
            </span>
            <span className="text-xs text-white/40">Premium Member</span>
          </div>
        </div>

        <ul className="flex-1 flex flex-col space-y-1">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pb-8" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-xs font-semibold text-white/40 uppercase tracking-[0.1em] px-4 pb-4">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5 text-white/40" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className="text-white">{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  !submenus || submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full justify-start h-auto py-2.5 px-4 mb-1",
                                "rounded-xl transition-all duration-200",
                                "text-white/70 hover:text-white",
                                "hover:bg-white/10",
                                (active === undefined &&
                                  pathname.startsWith(href)) ||
                                  active
                                  ? "bg-white/10 text-white"
                                  : "",
                                isOpen === false && "justify-center px-3",
                              )}
                              asChild
                            >
                              <Link to={href}>
                                <span
                                  className={cn(isOpen === false ? "" : "mr-4")}
                                >
                                  <Icon
                                    size={20}
                                    className={cn(
                                      "text-white/70",
                                      ((active === undefined &&
                                        pathname.startsWith(href)) ||
                                        active) &&
                                        "text-white",
                                    )}
                                  />
                                </span>
                                <p
                                  className={cn(
                                    "text-base font-medium truncate",
                                    isOpen === false
                                      ? "opacity-0 w-0"
                                      : "opacity-100",
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              <p className="text-white">{label}</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={
                          active === undefined
                            ? pathname.startsWith(href)
                            : active
                        }
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  ),
              )}
            </li>
          ))}
        </ul>

        {/* User Profile Section & Bottom Actions */}
        <div className="mt-auto pt-6 border-t border-white/10">
          {/* Settings Link */}
          <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-auto py-2.5 px-4 mb-4",
                    "rounded-xl transition-all duration-200",
                    "text-white/70 hover:text-white hover:bg-white/10",
                    isOpen === false && "justify-center px-3",
                  )}
                  asChild
                >
                  <Link to="/settings">
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </span>
                    <p
                      className={cn(
                        "text-base font-medium",
                        isOpen === false ? "opacity-0 w-0" : "opacity-100",
                      )}
                    >
                      Settings
                    </p>
                  </Link>
                </Button>
              </TooltipTrigger>
              {isOpen === false && (
                <TooltipContent side="right">Settings</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

          {/* Sign Out Button */}
          <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {}}
                  variant="ghost"
                  className={cn(
                    "w-full h-auto py-3",
                    "rounded-xl border border-white/20",
                    "text-white font-semibold text-base",
                    "hover:bg-white/10 transition-all duration-200",
                    isOpen === false && "px-3",
                  )}
                >
                  <span className={cn(isOpen === false ? "" : "mr-3")}>
                    <LogOut size={20} />
                  </span>
                  <p
                    className={cn(
                      "whitespace-nowrap",
                      isOpen === false ? "opacity-0 w-0" : "opacity-100",
                    )}
                  >
                    Sign out
                  </p>
                </Button>
              </TooltipTrigger>
              {isOpen === false && (
                <TooltipContent side="right">Sign out</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </nav>
    </ScrollArea>
  );
}
