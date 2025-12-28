import { createConfig } from "@repo/ui/tailwind.config";

const baseConfig = createConfig({
  important: "#mfe2-root",
});

export default {
  ...baseConfig,
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
};
