import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { Menu } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui";

import {
  sidebarToggleContainerVariants,
  sidebarToggleButtonVariants,
  sidebarToggleIconVariants,
} from "./styles";
import { publishEvent } from "@repo/core";

export interface SidebarToggleProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof sidebarToggleContainerVariants>,
    VariantProps<typeof sidebarToggleButtonVariants>,
    VariantProps<typeof sidebarToggleIconVariants> {
  color?: "white" | "dark";
}

const SidebarToggle = React.forwardRef<HTMLDivElement, SidebarToggleProps>(
  ({ className, variant, color, ...props }, ref) => {
    const handleToggleOpen = () => {
      publishEvent("sidebar:toggle", { isOpen: true });
    };

    return (
      <div
        ref={ref}
        className={cn(sidebarToggleContainerVariants(), className)}
        {...props}
      >
        <Button
          onClick={handleToggleOpen}
          className={sidebarToggleButtonVariants({ variant })}
          variant="ghost"
          size="icon"
        >
          <Menu className={sidebarToggleIconVariants({ color })} />
        </Button>
      </div>
    );
  },
);

SidebarToggle.displayName = "SidebarToggle";

export {
  SidebarToggle,
  sidebarToggleContainerVariants,
  sidebarToggleButtonVariants,
  sidebarToggleIconVariants,
};
