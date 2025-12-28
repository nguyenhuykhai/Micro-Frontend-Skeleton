import React from "react";
import "../../../mfe2.css";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return <div id="mfe2-root">{children}</div>;
};
