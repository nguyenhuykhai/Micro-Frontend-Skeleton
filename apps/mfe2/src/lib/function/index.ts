import type { IPermission } from "@/types";

export const checkPermissions = (
  permissions: IPermission | IPermission[] | boolean
): boolean => {
  // Stub implementation - customize based on your permission logic
  if (typeof permissions === "boolean") {
    return permissions;
  }

  // If you have a real permission check, implement it here
  // For now, return true to allow access
  return true;
};
