import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
  server: { port: 5180, host: true },
  build: {
    outDir: "../../public/web-video-presentation",
    emptyOutDir: true,
  },
});
