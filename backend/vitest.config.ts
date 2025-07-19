// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // optional, for global `describe`, `it`, etc.
    environment: "node", // or 'jsdom' if testing browser code
    coverage: {
      provider: "v8", // or 'v8' for experimental speed
      reporter: ["text", "lcov", "html"], // customize as needed
      reportsDirectory: "./coverage",
      exclude: [
        "node_modules/",
        "tests/",
        "src/types/",
        "eslint.config.js",
        "vitest.config.ts",
        "index.ts",
      ], // optional
    },
  },
});
