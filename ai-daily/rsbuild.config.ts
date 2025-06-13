import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: "./src/entry.tsx",
    },
  },
  output: {
    distPath: {
      root: "../public/ai-daily",
      css: "./static/css",
      js: "./static/js",
    },
  },
});
