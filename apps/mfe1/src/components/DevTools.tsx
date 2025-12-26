import React from "react";

interface DevToolsProps {
  children: React.ReactNode;
}

const DevTools: React.FC<DevToolsProps> = ({ children }) => {
  // Only render in development mode
  // Rsbuild automatically sets NODE_ENV based on the command
  // 'pnpm run dev' -> NODE_ENV = 'development'
  // 'pnpm run build' -> NODE_ENV = 'production'
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return <>{children}</>;
};

export default DevTools;
