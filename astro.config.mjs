import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import starlight from '@astrojs/starlight';
import tailwind from "@astrojs/tailwind";
import yaml from '@rollup/plugin-yaml';
import million from "million/compiler";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  vite: {
    plugins: [
      yaml(),
      million.vite({
        mode: "react",
        server: true,
        auto: {
          threshold: 0.05,
          skip: ["useBadHook", /badVariable/g],
        },
      }),
    ],
  },
  integrations: [starlight({
    title: 'Docs with Tailwind',
    social: {
      github: 'https://github.com/withastro/starlight',
    },
    sidebar: [
      {
        label: 'Guides',
        items: [
          // Each item here is one entry in the navigation menu.
          { label: 'Example Guide', link: '/guides/example/' },
        ],
      },
      {
        label: 'Reference',
        autogenerate: { directory: 'reference' },
      },
    ],
    customCss: ['./src/tailwind.css'],
  }),
  tailwind({ applyBaseStyles: false }),
  sitemap(), react()]
});