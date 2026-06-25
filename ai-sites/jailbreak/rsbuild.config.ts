import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [pluginReact()],
  source: { entry: { index: "./src/entry.tsx" } },
  html: { title: "模型越狱 · 安全限制怎样被绕过" },
  output: {
    distPath: { root: "../../public/jailbreak" },
    cleanDistPath: true,
    assetPrefix: "./",
  },
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [
          require("tailwindcss")({ config: path.resolve(__dirname, "tailwind.config.js") }),
          require("autoprefixer"),
        ],
      },
    },
  },
});
