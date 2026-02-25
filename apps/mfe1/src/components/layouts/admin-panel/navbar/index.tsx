import TaskSideSheet from "@/components/common/deprecated/createTaskForm";
import { SidebarToggle } from "../sidebar-toggle";
import { navbarContainerVariants } from "./styles";
import { useEffect, useState } from "react";
import { subscribeEvent } from "@repo/core";
import { cn } from "@repo/ui";

interface NavbarProps {
  title: string;
  extraContent?: React.ReactNode;
  className?: string;
}

const Navbar = ({ title, extraContent, className }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Effects
  useEffect(() => {
    const unsubscribe = subscribeEvent("sidebar:toggle", (payload) => {
      const { isOpen } = payload;
      setIsOpen(isOpen);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <header className={navbarContainerVariants({ isOpen })}>
        <div className={cn("flex h-20 items-center relative z-10", className)}>
          <div className="flex items-center space-x-4">
            <SidebarToggle />
            <div>
              <h1 className="text-xl md:text-4xl font-bold text-white">
                {title}
              </h1>
              <p className="text-xs md:text-base text-white/70">
                It's time for deep work.
              </p>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            {extraContent ? extraContent : <TaskSideSheet />}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
