import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { dependencies } from "@module-federation/enhanced";

const buildRemotes = () => {
  const remotes: Record<string, string> = {};
  const hostUrl = process.env.VITE_MFE1_BASE_URL + "/remoteEntry.js";
  const hostScope = process.env.VITE_MFE1_SCOPE || "host";
  remotes[hostScope] = `${hostScope}@${hostUrl}`;

  return remotes;
};

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
      remotes: buildRemotes(),
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
