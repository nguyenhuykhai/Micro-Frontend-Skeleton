import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { dependencies } from "@module-federation/enhanced";

export default defineConfig({
  server: {
    port: 3004,
    host: "localhost",
    cors: true,
  },
  dev: {
    assetPrefix: process.env.VITE_FOCUSHIVE_BASE_URL || "http://localhost:3004",
  },
  output: {
    assetPrefix: process.env.VITE_FOCUSHIVE_BASE_URL || "http://localhost:3004",
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "focushive",
      exposes: {
        "./FocusHiveApp": "./src/apps/main-app",
      },
      filename: "remoteEntry.js",
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: false,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: false,
        },
      },
      bridge: {
        enableBridgeRouter: true,
      },
      dts: false,
    }),
  ],
});
