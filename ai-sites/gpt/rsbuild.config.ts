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
    title: "GPT · 一份手册",
  },
  server: {
    publicDir: false,
  },
  output: {
    distPath: { root: "../../public/gpt" },
    assetPrefix: "./",
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
