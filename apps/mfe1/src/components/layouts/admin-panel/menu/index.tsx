import { ChevronsLeft, Settings } from "lucide-react";
import { Link } from "react-router";
import { useLocation } from "react-router-dom";

import { getMenuList } from "@/constants/menu";
import { Button, ScrollArea } from "@repo/ui";
import { cn } from "@repo/ui/lib/utils";

import * as styles from "./styles";
import { publishEvent } from "@repo/core";

const Menu = () => {
  const { pathname } = useLocation();
  const menuList = getMenuList(pathname);

  const handleToggleClose = () => {
    publishEvent("sidebar:toggle", { isOpen: false });
  };

  return (
    <ScrollArea invisibleScrollbar className="[&>div>div[style]]:!block">
      <nav className={styles.menuContainerVariants()}>
        {/* User Profile */}
        <div className={styles.menuUserProfileVariants()}>
          <div className={styles.menuUserProfileFlexVariants()}>
            {/* Avatar with status */}
            <div className={styles.menuUserAvatarVariants()}>
              <div className={styles.menuUserAvatarFlexVariants()}>AU</div>
            </div>

            {/* User Info */}
            <div className={styles.menuUserFlexVariants()}>
              <span className={styles.menuUserInfoVariants()}>
                Animesh User
              </span>
              <span className={styles.menuUserInfoVariants()}>
                Premium Member
              </span>
            </div>
          </div>

          <div>
            <Button
              variant="ghost"
              className={styles.menuUserAvatarButtonVariants()}
              onClick={handleToggleClose}
            >
              <ChevronsLeft className="text-white" />
            </Button>
          </div>
        </div>

        <ul className={styles.menuListVariants()}>
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full")} key={index}>
              <p className={styles.menuGroupLabelVariants()}>{groupLabel}</p>
              <div className="flex flex-col gap-2">
                {menus.map(({ href, label, icon: Icon, active }, index) => (
                  <div className="w-full" key={index}>
                    <Button
                      variant="ghost"
                      className={styles.menuItemButtonVariants({
                        state:
                          (active === undefined && pathname.startsWith(href)) ||
                          active
                            ? "active"
                            : "default",
                      })}
                      asChild
                    >
                      <Link to={href}>
                        <span className="mr-2">
                          <Icon
                            size={20}
                            className={styles.menuItemIconVariants({
                              active:
                                (active === undefined &&
                                  pathname.startsWith(href)) ||
                                active,
                            })}
                          />
                        </span>
                        <p className={styles.menuItemLabelVariants()}>
                          {label}
                        </p>
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>

        <div className="border-t border-white/10" />

        {/* Bottom Actions */}
        <div className={styles.menuBottomActionsVariants()}>
          {/* Settings Link */}
          <Button
            variant="ghost"
            className={styles.menuActionButtonVariants()}
            asChild
          >
            <Link to="/settings">
              <Settings />
              <p className={styles.menuActionTextVariants()}>Settings</p>
            </Link>
          </Button>

          {/* Sign Out Button */}
          <div className="w-full text-center">
            <Button
              onClick={() => {}}
              variant="ghost"
              className={styles.menuSignOutButtonVariants()}
            >
              <p className={styles.menuSignOutTextVariants()}>Sign out</p>
            </Button>
          </div>
        </div>
      </nav>
    </ScrollArea>
  );
};

export default Menu;
