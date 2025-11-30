import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, BarChart3, Settings, Users } from "lucide-react";
import type { AppMenuItem } from "@/lib/menu";

interface AppSidebarProps {
  onSidebarItemSelect?: (app: AppMenuItem) => void;
}

const AppSidebar = ({ onSidebarItemSelect }: AppSidebarProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems: AppMenuItem[] = [
    { id: "home", label: "Home", icon: Home, href: "#" },
    { id: "analytics", label: "Analytics", icon: BarChart3, href: "#" },
    { id: "team", label: "Team", icon: Users, href: "#" },
    { id: "settings", label: "Settings", icon: Settings, href: "#" },
    {
      id: "task-management",
      label: "Task Management",
      icon: Settings,
      href: "#",
      isRemote: true,
    },
  ];

  return (
    <Sidebar className="border-r border-sidebar-border bg-gradient-to-b from-sidebar to-sidebar">
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar-primary/5 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-bold">
            M
          </div>
          <h2 className="text-lg font-bold text-sidebar-foreground">MFE1</h2>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="px-0">
        <SidebarMenu className="gap-1 px-3">
          {/* Main Navigation */}
          <div className="mb-6">
            <p className="px-2 py-2 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
              Navigation
            </p>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    className="h-10 px-3 transition-all duration-200"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <a
                      onClick={() => {
                        onSidebarItemSelect?.(item);
                      }}
                      className={`group flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${
                        hoveredItem === item.id
                          ? "bg-sidebar-primary/10 text-sidebar-primary"
                          : "text-sidebar-foreground hover:bg-sidebar-accent"
                      }`}
                    >
                      <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                      <span className="font-medium">{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </div>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
