import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteTesting } from "@testing-library/svelte/vite";
import { resolve } from "path";
import { version } from "./package.json";

export default defineConfig({
  define: {
    "process.env.VITE_APP_VERSION": JSON.stringify(version),
  },
  plugins: [svelte(), svelteTesting()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: resolve(__dirname, "src/main.prod.js"),
      output: {
        entryFileNames: `markupRefineLibJs -v${version}-[hash].js`,
        chunkFileNames: `markupRefineLibJs-v${version}-[hash].js`,
        assetFileNames: `markupRefineLibJs-v${version}-[hash].[ext]`,
      },
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
