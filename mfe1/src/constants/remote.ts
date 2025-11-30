import type { RemoteApp } from "../types";

export const REMOTE_APPS: RemoteApp[] = [
  {
    id: "mfe2",
    name: import.meta.env.VITE_MFE2_NAME,
    url: import.meta.env.VITE_MFE2_BASE_URL + "/remoteEntry.js",
    scope: import.meta.env.VITE_MFE2_SCOPE,
    module: import.meta.env.VITE_MFE2_MODULE,
  },
];
