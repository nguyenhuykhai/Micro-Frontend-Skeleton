import Dashboard from "@/pages/Dashboard";
import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { withLazyLoading } from "../router-helper";

const AppLayout = lazy(() => import("@/components/layouts/app-layout"));

const MainAppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={withLazyLoading(AppLayout)}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainAppRoutes;
