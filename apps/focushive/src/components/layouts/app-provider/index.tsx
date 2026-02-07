import React, { type ReactNode, useState } from "react";
import "../../../focushive.css";
import { Outlet } from "react-router";
import { useThemeSync } from "@/hooks/useThemeSync";
import { PortalContainerProvider } from "@repo/ui";

interface AppProviderProps {
  children?: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({
  children,
}: AppProviderProps) => {
  // Sync theme from localStorage (ui-theme)
  useThemeSync();

  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <div
      id="focushive-root"
      ref={setContainer}
      className="min-h-0 bg-transparent"
    >
      <PortalContainerProvider container={container}>
        {children ? <>{children}</> : <Outlet />}
      </PortalContainerProvider>
    </div>
  );
};

export default AppProvider;
