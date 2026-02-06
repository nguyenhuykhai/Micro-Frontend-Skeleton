import { Menu } from "@/components/layouts/admin-panel/menu";
import { SidebarToggle } from "@/components/layouts/admin-panel/sidebar-toggle";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@repo/ui/lib/utils";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;

  return (
    <>
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <aside
        className={cn(
          "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
          !getOpenState() ? "w-0" : "w-72",
          settings.disabled && "hidden",
        )}
      >
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className={cn(
            "relative h-full flex flex-col overflow-y-auto",
            // Glassmorphism effect
            "bg-[rgba(20,30,50,0.8)] dark:bg-[rgba(20,30,50,0.8)]",
            "backdrop-blur-[20px]",
            "border-r border-[rgba(255,255,255,0.1)]",
            "shadow-lg",
            // Adjust padding based on state
            !getOpenState() ? "px-0 py-20" : "px-3 py-6",
          )}
        >
          {/* Navigation Menu */}
          <Menu isOpen={getOpenState()} />
        </div>
      </aside>
    </>
  );
}
