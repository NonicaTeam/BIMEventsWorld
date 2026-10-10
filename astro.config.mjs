// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import eventsData from './src/data/events.json';
import { getUpcomingEvents } from './src/utils/events.ts';

// Event pages are built for every event so old links keep working, but only upcoming ones go in the sitemap
const upcomingEventIds = new Set(getUpcomingEvents(/** @type {any} */ (eventsData)).map((event) => event.id));
/** @param {string} page */
const isListedPage = (page) => {
  const eventId = page.match(/\/events\/([^/]+)\/$/)?.[1];
  return !eventId || upcomingEventIds.has(eventId);
};

export default defineConfig({
  site: 'https://bimeventsworld.com',
  output: 'static',
  adapter: cloudflare(),
  integrations: [
    sitemap({
      // No lastmod: the site rebuilds daily, so the build date would mark every page as changed every day
      // and Google would learn to ignore it. events.json has no per-event change dates to use instead.
      // Newsletter opt-in landing page: never listed in search engines.
      // The bare root only redirects to /en/, so it is left out as well.
      // Past events (and events more than 12 months out) are left out too.
      filter: (page) => !page.includes('/subscribed') && page !== 'https://bimeventsworld.com/' && isListedPage(page),
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
