import { lazy } from "react";
import { Route, Routes } from "react-router";
import { withLazyLoading, withLazyLoadingPermission } from "../router-helper";
import type { IPermission } from "@/types";
import { APP_ROUTES } from "@/constants/remote";

const TaskManagement = lazy(() => import("@/pages/TaskManagement"));
const Home = lazy(() => import("@/pages/Home"));
const DocsPage = lazy(() => import("@/pages/DocsPage"));
const FocusHive = lazy(() => import("@/pages/FocusHive"));
const AppLayout = lazy(() => import("@/components/layouts/app-layout"));
const NotFound = lazy(() => import("@/components/common/templates/NotFound"));
const NotHavePermission = lazy(
  () => import("@/components/common/templates/NotHavePermission"),
);

export const MainAppRoutes = () => {
  const subApps: {
    key: string;
    path: string;
    component: any;
    permission?: IPermission | IPermission[] | boolean;
  }[] = [
    {
      key: APP_ROUTES.MFE2.key,
      path: APP_ROUTES.MFE2.path,
      component: TaskManagement,
      permission: true,
    },
    {
      key: APP_ROUTES.DOCS.key,
      path: APP_ROUTES.DOCS.path,
      component: DocsPage,
      permission: true,
    },
    {
      key: APP_ROUTES.FOCUS_HIVE.key,
      path: APP_ROUTES.FOCUS_HIVE.path,
      component: FocusHive,
      permission: true,
    },
  ];

  const microAppRoutes = [
    ...subApps.map((subApp) => (
      <Route
        key={subApp.key}
        path={subApp.path}
        element={withLazyLoadingPermission(subApp.component, subApp.permission)}
      />
    )),
  ];

  return (
    <Routes>
      <Route path="/" element={withLazyLoading(AppLayout)}>
        <Route index element={withLazyLoading(Home)} />
        {microAppRoutes}
        <Route
          path="not-have-permission"
          element={withLazyLoading(NotHavePermission)}
        />
        <Route path="*" element={withLazyLoading(NotFound)} />
      </Route>
    </Routes>
  );
};
