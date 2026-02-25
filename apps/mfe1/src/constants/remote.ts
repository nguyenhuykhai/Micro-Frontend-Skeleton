import type { AppRoute, RemoteApp } from "../types";

export const REMOTE_APPS: RemoteApp[] = [
  {
    id: "mfe2",
    name: import.meta.env.VITE_MFE2_NAME,
    url: import.meta.env.VITE_MFE2_BASE_URL + "/remoteEntry.js",
    scope: import.meta.env.VITE_MFE2_SCOPE,
    module: import.meta.env.VITE_MFE2_MODULE,
  },
  {
    id: "focushive",
    name: import.meta.env.VITE_FOCUSHIVE_NAME,
    url: import.meta.env.VITE_FOCUSHIVE_BASE_URL + "/remoteEntry.js",
    scope: import.meta.env.VITE_FOCUSHIVE_SCOPE,
    module: import.meta.env.VITE_FOCUSHIVE_MODULE,
  },
];

export const APP_ROUTES: Record<string, AppRoute> = {
  HOME: {
    key: "/",
    path: "/",
  },
  NOT_HAVE_PERMISSION: {
    key: "/not-have-permission",
    path: "/not-have-permission",
  },
  MFE2: {
    key: "task-management",
    path: "task-management/*",
    isRemote: true,
  },
  DOCS: {
    key: "docs",
    path: "docs/*",
  },
  FOCUS_HIVE: {
    key: "focus-hive",
    path: "focus-hive/*",
    isRemote: true,
  },
};
