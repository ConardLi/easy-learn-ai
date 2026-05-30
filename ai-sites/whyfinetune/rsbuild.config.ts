import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [pluginReact()],
  root: path.resolve(__dirname),
  source: {
    entry: {
      index: path.resolve(__dirname, "./src/entry.tsx"),
    },
    tsconfigPath: path.resolve(__dirname, "./tsconfig.json"),
  },
  html: {
    title: "为什么要微调 · 一份手册",
  },
  output: {
    distPath: { root: path.resolve(__dirname, "../../public/whyfinetune") },
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
