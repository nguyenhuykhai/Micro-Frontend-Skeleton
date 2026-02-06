import { useEffect, useState } from "react";
import { subscribeEvent } from "@repo/core/event-bus";

type Theme = "light" | "dark";

export const useThemeSync = () => {
  // 1. Initialize state from localStorage or default to dark (FOCUSHIVE is dark-themed)
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("ui-theme") as Theme) || "dark";
    }
    return "dark";
  });

  // 2. Function to apply the theme to #focushive-root (where CSS variables are scoped)
  const applyTheme = (newTheme: Theme) => {
    const focushiveRoot = document.getElementById("focushive-root");

    if (focushiveRoot) {
      if (newTheme === "dark") {
        focushiveRoot.classList.add("dark");
      } else {
        focushiveRoot.classList.remove("dark");
      }
    }
  };

  useEffect(() => {
    // Apply initial theme
    applyTheme(theme);

    // Subscribe to theme:change events from event bus (real-time from host app)
    const unsubscribe = subscribeEvent("theme:change", (payload) => {
      const newTheme = payload.theme as Theme;
      setTheme(newTheme);
      applyTheme(newTheme);
    });

    // Listen for storage changes (from other tabs/windows)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "ui-theme" && e.newValue) {
        const newTheme = e.newValue as Theme;
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      unsubscribe();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [theme]);

  return { theme };
};
