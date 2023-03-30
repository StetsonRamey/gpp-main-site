import { defineConfig } from "astro/config";
import image from "@astrojs/image";
import remarkGfm from "remark-gfm";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://greatplainspaintingkc.com/",
  integrations: [
    image({
      logLevel: "debug",
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    mdx({
      remarkPlugins: [remarkGfm],
    }),
  ],
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});
