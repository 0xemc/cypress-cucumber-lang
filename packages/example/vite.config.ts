import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tsconfigPaths from "vite-tsconfig-paths";
import sveltePreprocess from "svelte-preprocess";

export default defineConfig({
  plugins: [svelte({ preprocess: sveltePreprocess() }), tsconfigPaths()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      $components: "/src/components",
      $store: "/src/store",
      $types: "/src/types",
    },
  },
});
