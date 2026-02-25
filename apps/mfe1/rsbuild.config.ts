import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { dependencies } from "@module-federation/enhanced";

const buildRemotes = () => {
  const remotes: Record<string, string> = {};
  const mfe2Url = process.env.VITE_MFE2_BASE_URL + "/remoteEntry.js";
  const mfe2Scope = process.env.VITE_MFE2_SCOPE || "remote";
  remotes[mfe2Scope] = `${mfe2Scope}@${mfe2Url}`;

  const focushiveUrl = process.env.VITE_FOCUSHIVE_BASE_URL + "/remoteEntry.js";
  const focushiveScope = process.env.VITE_FOCUSHIVE_SCOPE || "focushive";
  remotes[focushiveScope] = `${focushiveScope}@${focushiveUrl}`;

  return remotes;
};

export default defineConfig({
  source: {
    define: {
      "import.meta.env.VITE_DOCS_BASE_URL": JSON.stringify(
        process.env.VITE_DOCS_BASE_URL || "http://localhost:3000",
      ),
    },
  },
  server: {
    port: 3001,
    host: "localhost", // Add this
    cors: true, // Add this
  },
  dev: {
    assetPrefix: process.env.VITE_MFE1_BASE_URL || "http://localhost:3001",
  },
  output: {
    assetPrefix: process.env.VITE_MFE1_BASE_URL || "http://localhost:3001",
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "host",
      remotes: buildRemotes(),
      exposes: {
        "./MyNavbar": "./src/components/common/molecules/my-navbar",
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
