import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: "./src/entry.tsx",
    },
  },
  html: {
    title: "Easy AI - code秘密花园",
    favicon: "./public/imgs/icon.ico",
    tags: [
      {
        tag: "link",
        attrs: { rel: "preconnect", href: "https://fonts.googleapis.com" },
        head: true,
      },
      {
        tag: "link",
        attrs: {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        head: true,
      },
      {
        tag: "link",
        attrs: {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400..800&family=Noto+Sans+SC:wght@400..900&family=Newsreader:ital,opsz,wght@1,6..72,500..700&family=Geist+Mono:wght@400..500&display=swap",
        },
        head: true,
      },
    ],
  },
});
