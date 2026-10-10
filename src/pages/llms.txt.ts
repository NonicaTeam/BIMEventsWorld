import { languages } from '../i18n/locales';
import { SITE_URL } from '../utils/events';

// https://llmstxt.org: a short guide to the site for AI agents and LLMs
export const prerender = true;

export function GET() {
  const languageLinks = Object.entries(languages)
    .map(([code, name]) => `- [${name}](${SITE_URL}/${code}/)`)
    .join('\n');

  const body = `# BIM Events World

> A free, open-source calendar of upcoming BIM (Building Information Modeling) conferences and events worldwide, shown on an interactive 3D globe. It covers in-person, online and hybrid events starting within the next 12 months.

The site rebuilds automatically every day. Past events are removed automatically from the listings and from the data feed, so everything listed here is upcoming.

## Data

- [events.json](${SITE_URL}/events.json): the main data source. All upcoming events as JSON: name, start and end date, city, country, coordinates, format (in-person, online, hybrid), official website, description, and the canonical event page on bimeventsworld.com. Featured events come first, then events sorted by start date. Prefer this file over scraping the HTML.

## Languages

${languageLinks}

## Source

- [GitHub repository](https://github.com/NonicaTeam/BIMEventsWorld): the event data lives in src/data/events.json. New events can be submitted through an issue.
- [Sitemap](${SITE_URL}/sitemap-index.xml)
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
