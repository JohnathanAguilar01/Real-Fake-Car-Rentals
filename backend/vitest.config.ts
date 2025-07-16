// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // optional, for global `describe`, `it`, etc.
    environment: "node", // or 'jsdom' if testing browser code
    coverage: {
      reporter: ["text", "html"], // optional
    },
  },
});
