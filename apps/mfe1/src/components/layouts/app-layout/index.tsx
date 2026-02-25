import { SidebarProvider } from "@repo/ui";
import { type ReactNode } from "react";
import { Outlet } from "react-router";
import AdminPanelLayout from "../admin-panel/admin-panel-layout";
import { ContentLayout } from "../admin-panel/content-layout";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { NotificationCenter } from "@/components/common/atoms/notifications/NotificationCenter";
import DevTools from "@/components/DevTools";
import { EventDebugger } from "@repo/ui";
import landmartBg from "@repo/ui/lib/assets/landmart_bg.jpg";
import { gradientBackgroundVariants } from "./styles";
import AppProvider from "@/components/providers/app-provider";

const AppLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <AppProvider>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        {/* Container wrapper */}
        <div className="relative h-screen overflow-hidden">
          {/* Background Image Layer - z-0 */}
          <img
            alt="Living room background"
            className="fixed inset-0 -z-5 h-full w-full object-cover transition-opacity duration-700 ease-out"
            src={landmartBg}
            style={{ opacity: 1 }}
          />

          {/* Gradient overlay - z-1 */}
          <div className={gradientBackgroundVariants()} aria-hidden="true" />

          {/* Main content - z-10 */}
          <div className="relative z-10 h-full">
            <SidebarProvider>
              <DevTools>
                <EventDebugger />
              </DevTools>

              <AdminPanelLayout>
                <ContentLayout title="MFE Skeleton">
                  {children ? <>{children}</> : <Outlet />}
                </ContentLayout>
              </AdminPanelLayout>
            </SidebarProvider>
          </div>
        </div>

        <NotificationCenter />
      </ThemeProvider>
    </AppProvider>
  );
};

export default AppLayout;
