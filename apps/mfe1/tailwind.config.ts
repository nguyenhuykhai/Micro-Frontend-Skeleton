import baseConfig from "@repo/ui/tailwind.config";

export default {
  ...baseConfig,
  content: [
    "./src/**/*.{ts,tsx}", // Scan mfe1 source files
    "../../packages/ui/src/**/*.{ts,tsx}", // Scan UI package components
  ],
};
