import type { VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@repo/ui/lib/utils";

import Menu from "../menu";
import { sidebarContainerVariants, sidebarInnerVariants } from "./styles";
import { subscribeEvent, publishEvent } from "@repo/core";

export interface SidebarProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sidebarContainerVariants> {}

const Sidebar: React.FC<SidebarProps> = ({ className, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const sidebarRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const unsubscribe = subscribeEvent("sidebar:toggle", (payload) => {
      const { isOpen } = payload;
      setIsOpen(isOpen);
    });
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        publishEvent("sidebar:toggle", { isOpen: false });
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        sidebarContainerVariants({
          state: isOpen ? "expanded" : "collapsed",
        }),
        className,
      )}
      {...props}
    >
      <div className={sidebarInnerVariants()}>
        <Menu />
      </div>
    </aside>
  );
};

Sidebar.displayName = "Sidebar";

export { Sidebar, sidebarContainerVariants, sidebarInnerVariants };
