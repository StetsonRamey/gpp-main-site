import { defineConfig } from "astro/config";
import image from "@astrojs/image";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  integrations: [
    image({
      logLevel: "debug",
    }),
    partytown({
      config: {
        forward: ["datalayer.push"],
      },
    }),
  ],
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});
