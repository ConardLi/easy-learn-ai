import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
  css: {
    postcss: { plugins: [] },
  },
  server: { port: 5181, host: true },
  build: {
    outDir: "../../public/web-design-engineer",
    emptyOutDir: true,
  },
});
