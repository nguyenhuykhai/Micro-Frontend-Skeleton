import { createBridgeComponent } from "@module-federation/bridge-react/v18";
import { AppProvider } from "./layouts/app-provider";
import Button from "./Button";

export default createBridgeComponent({
  rootComponent: () => (
    <AppProvider>
      <Button />
    </AppProvider>
  ),
});
