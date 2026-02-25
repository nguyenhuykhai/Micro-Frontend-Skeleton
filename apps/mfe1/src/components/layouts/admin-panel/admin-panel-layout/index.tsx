import type { VariantProps } from "class-variance-authority";
import * as React from "react";

import { Sidebar } from "@/components/layouts/admin-panel/sidebar";
import { cn } from "@repo/ui/lib/utils";

import { adminPanelMainVariants } from "./styles";

export interface AdminPanelLayoutProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof adminPanelMainVariants> {
  children: React.ReactNode;
}

const AdminPanelLayout = React.forwardRef<HTMLElement, AdminPanelLayoutProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="flex">
        <Sidebar />
        <main
          ref={ref}
          className={cn(adminPanelMainVariants(), className)}
          {...props}
        >
          {children}
        </main>
      </div>
    );
  },
);

AdminPanelLayout.displayName = "AdminPanelLayout";

export default AdminPanelLayout;
export { AdminPanelLayout, adminPanelMainVariants };
