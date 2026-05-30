import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [pluginReact()],
  root: path.resolve(__dirname),
  source: {
    entry: {
      index: "./src/entry.tsx",
    },
  },
  html: {
    title: "学习率 · 一份手册",
  },
  output: {
    distPath: { root: "../../public/learning-rate" },
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
