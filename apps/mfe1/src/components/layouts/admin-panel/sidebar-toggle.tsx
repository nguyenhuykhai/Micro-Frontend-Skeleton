import { Menu } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui";

interface SidebarToggleProps {
  isOpen?: boolean | undefined;
  setIsOpen?: () => void;
}

export function SidebarToggle({ setIsOpen }: SidebarToggleProps) {
  return (
    <div className="absolute top-4 left-4 z-30">
      <Button
        onClick={() => setIsOpen?.()}
        className={cn(
          "rounded-lg w-10 h-10 transition-all duration-300",
          "bg-white/10 hover:bg-white/20 border-0",
          "backdrop-blur-sm",
        )}
        variant="ghost"
        size="icon"
      >
        <Menu
          className={cn(
            "h-5 w-5 transition-all ease-in-out duration-300 text-white",
          )}
        />
      </Button>
    </div>
  );
}
