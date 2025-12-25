import { REMOTE_APPS } from "@/constants/remote";
import type { RemoteApp } from "@/types";

// Helper to get remote app by id
export const getRemoteAppById = (id: string): RemoteApp | undefined => {
  return REMOTE_APPS.find((app) => app.id === id);
};
