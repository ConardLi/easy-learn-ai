import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [pluginReact()],
  source: { entry: { index: "./src/entry.tsx" } },
  html: { title: "轻松理解 注意力机制" },
  output: {
    distPath: { root: "../../public/attention" },
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
