import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [pluginReact()],
  source: {
    entry: {
      index: "./src/entry.tsx",
    },
  },
  html: {
    title: "Llama · 一份手册",
  },
  output: {
    distPath: { root: "../../public/llama" },
    assetPrefix: "./",
  },
  server: {
    publicDir: false,
  },
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [
          require("tailwindcss")({
            config: path.resolve(__dirname, "tailwind.config.js"),
          }),
          require("autoprefixer"),
        ],
      },
    },
  },
});
