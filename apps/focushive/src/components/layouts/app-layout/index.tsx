import { type ReactNode } from "react";
import { Outlet } from "react-router";
import AppProvider from "../app-provider";
import { createRemoteAppComponent } from "@module-federation/bridge-react";
import { loadRemote } from "@module-federation/runtime";
import { LoaderTwo } from "@repo/ui";

const MyNavbar = createRemoteAppComponent({
  loader: () => loadRemote("host/MyNavbar"),
  loading: <LoaderTwo />,
  fallback: (error: unknown) => <p>Error {error as string}</p>,
});

const AppLayoutContent = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="relative flex-1 max-h-screen w-full">
      <MyNavbar title="Focus Hive" />
      {/* Content Layer - positioned above background */}
      <div className="relative z-10 flex flex-1 max-h-screen w-full">
        {/* Main Content Area - Flexible, full width */}
        <main className="flex-1 max-h-screen">
          {children ? <>{children}</> : <Outlet />}
        </main>

        {/* Right Customization Sidebar - 320px fixed width */}
        {/* <CustomizationSidebar /> */}
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
