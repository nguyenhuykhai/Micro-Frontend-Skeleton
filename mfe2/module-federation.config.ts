import { dependencies } from "@module-federation/enhanced";
import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";

export default createModuleFederationConfig({
  name: "remote",
  exposes: {
    "./Button": "./src/components/export-app",
  },
  filename: "remoteEntry.js",
  shared: {
    ...dependencies,
    react: {
      singleton: true,
    },
    "react-dom": {
      singleton: true,
    },
  },
  bridge: {
    // Enable Bridge Router routing capabilities, default is true
    enableBridgeRouter: true,
  },
  dts: false,
});
