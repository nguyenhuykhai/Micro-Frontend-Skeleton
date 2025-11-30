import { useState } from "react";
import AppSidebar from "./components/layouts/app-sidebar";
import { SidebarTrigger } from "./components/ui/sidebar";
import TaskManagement from "./pages/TaskManagement";
import type { AppMenuItem } from "./lib/menu";

const App = () => {
  const [activeApp, setActiveApp] = useState<AppMenuItem | null>(null);

  return (
    <div className="flex h-screen">
      {/* Sidebar   */}
      <AppSidebar onSidebarItemSelect={(app) => setActiveApp(app)} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="content">
            <SidebarTrigger />
            <h1 className="text-3xl font-bold mb-4">MFE1</h1>
            {activeApp && activeApp.isRemote ? (
              <TaskManagement />
            ) : (
              <h1>Not Remote</h1>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
