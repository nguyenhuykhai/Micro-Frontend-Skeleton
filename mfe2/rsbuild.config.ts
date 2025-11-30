import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import mfConfig from "./module-federation.config";

export default defineConfig({
  server: {
    port: 3002,
    cors: true,
  },
  dev: {
    assetPrefix: "http://localhost:3002",
  },
  output: {
    assetPrefix: "http://localhost:3002",
  },
  html: {
    template: "./index.html",
  },
  source: {
    entry: {
      index: "./src/index.tsx",
    },
  },
  plugins: [pluginReact(), pluginModuleFederation(mfConfig)],
});
