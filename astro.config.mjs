// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import markdoc from "@astrojs/markdoc";

// https://astro.build/config
export default defineConfig({
  site: "https://pyquickst.art",
  integrations: [
    starlight({
      title: "Python QuickStart",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      sidebar: [
        {
          label: "Course",
          autogenerate: { directory: "curriculum" },
        },
      ],
    }),
    markdoc(),
  ],
});
