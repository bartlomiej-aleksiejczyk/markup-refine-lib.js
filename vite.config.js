import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteTesting } from "@testing-library/svelte/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [svelte(), svelteTesting()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: resolve(__dirname, "src/main.prod.js"),
    },
  },
  server: {
    port: 3000,
    open: "/index.dev.html",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFilesAfterEnv: ["src/lib/**/*.{js,svelte}"],
    coverage: {
      include: ["src/*"],
    },
  },
});
