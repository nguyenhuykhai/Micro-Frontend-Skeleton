import MainAppRoutes from "@/router/routes/main-app-router";
import { createBridgeComponent } from "@module-federation/bridge-react/v18";

export const FocusHiveApp = () => {
  return <MainAppRoutes />;
};

export default createBridgeComponent({
  rootComponent: FocusHiveApp,
});
