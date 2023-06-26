import { defineConfig } from "astro/config";
import image from "@astrojs/image";
import remarkGfm from "remark-gfm";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true,
  },
  site: "https://www.greatplainspaintingkc.com/",
  integrations: [
    image({
      logLevel: "debug",
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    mdx({
      remarkPlugins: [remarkGfm],
    }),
    sitemap(),
  ],
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});
