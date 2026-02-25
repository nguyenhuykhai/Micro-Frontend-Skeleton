import { APP_ROUTES } from "@/constants/remote";
import type { AppRoute } from "@/types";
import React, { createContext, useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";

interface AppContextType {
  isRemote: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  // Check if current path is a remote app route
  const isRemote = useMemo(() => {
    const pathname = location.pathname;
    return Object.values(APP_ROUTES)
      .filter((route: AppRoute) => route.isRemote)
      .some((route) => pathname.includes(`/${route.key}`));
  }, [location.pathname]);

  const value = useMemo(
    () => ({
      isRemote,
    }),
    [isRemote],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
