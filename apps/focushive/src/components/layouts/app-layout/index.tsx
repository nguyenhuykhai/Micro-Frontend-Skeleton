import { type ReactNode } from "react";
import { Outlet } from "react-router";
import AppProvider from "../app-provider";
import CustomizationSidebar from "@/components/customization/sidebar";
import livingRoomBg from "@repo/ui/lib/assets/living_room.webp";

const AppLayoutContent = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="relative flex min-h-screen w-full">
      {/* Background Image Layer */}
      <img
        alt="Living room background"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
        src={livingRoomBg}
        style={{ opacity: 1 }}
      />

      {/* Content Layer - positioned above background */}
      <div className="relative z-10 flex flex-1 min-h-screen w-full">
        {/* Main Content Area - Flexible, full width */}
        <main className="flex-1 overflow-y-auto">
          {children ? <>{children}</> : <Outlet />}
        </main>

        {/* Right Customization Sidebar - 320px fixed width */}
        <CustomizationSidebar />
      </div>
    </div>
  );
};

const AppLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <AppProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </AppProvider>
  );
};

export default AppLayout;
