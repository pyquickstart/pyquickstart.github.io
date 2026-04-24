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
      head: [
        {
          tag: "script",
          attrs: {
            async: true,
            src: "https://www.googletagmanager.com/gtag/js?id=G-K5K0NBFJ4M",
          },
        },
        {
          tag: "script",
          content: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `,
        },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      sidebar: [
        {
          label: "Python QuickStart",
          link: "/",
        },
        {
          label: "Onboarding",
          slug: "curriculum/module01",
        },
        {
          label: "Python Basics",
          slug: "curriculum/module02",
        },
        {
          label: "Collection Types",
          slug: "curriculum/module03",
        },
        {
          label: "Functions",
          slug: "curriculum/module04",
        },
        {
          label: "Databases",
          slug: "curriculum/module05",
        },
        {
          label: "Retrieving Data",
          slug: "curriculum/module06",
        },
        {
          label: "CLI Applications",
          slug: "curriculum/module07",
        },
        {
          label: "Formatting Output",
          slug: "curriculum/module08",
        }
      ],
    }),
    markdoc(),
  ],
});
