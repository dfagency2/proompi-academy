import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://academy.proompi.com',
  integrations: [
    mdx(),
    tailwind({ applyBaseStyles: false }),
  ],
  // Routing handled manually via pages/ structure (pl at root, en/ prefix)
});
