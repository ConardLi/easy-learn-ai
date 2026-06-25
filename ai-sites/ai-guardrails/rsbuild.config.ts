import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [pluginReact()],
  source: { entry: { index: "./src/entry.tsx" } },
  html: { title: "AI Guardrails · 给 AI 应用加检查" },
  output: {
    distPath: { root: "../../public/ai-guardrails" },
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
