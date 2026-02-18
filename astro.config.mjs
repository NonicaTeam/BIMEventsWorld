// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://bimeventsworld.com',
  output: 'static',
  adapter: cloudflare(),
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          es: 'es',
          fr: 'fr',
          de: 'de',
          it: 'it',
          nl: 'nl',
        },
      },
    }),
  ],
  i18n: {
    locales: ['en', 'es', 'fr', 'de', 'it', 'nl'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
});
