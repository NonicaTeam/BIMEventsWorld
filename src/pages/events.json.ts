import { SITE_URL, eventPageUrl, getUpcomingEvents, sortFeaturedFirst } from '../utils/events';
import eventsData from '../data/events.json';
import type { BIMEvent } from '../types';

// Public, machine-readable list of upcoming events. Generated at build time with the same
// filter as the site (past events removed, next 12 months); the site rebuilds daily.
export const prerender = true;

export function GET() {
  const events = sortFeaturedFirst(getUpcomingEvents(eventsData as BIMEvent[])).map((event) => ({
    id: event.id,
    name: event.name,
    city: event.city,
    country: event.country,
    countryCode: event.countryCode,
    lat: event.lat,
    lng: event.lng,
    startDate: event.startDate,
    endDate: event.endDate,
    mode: event.mode,
    url: event.url,
    description: event.description ?? {},
    pageUrl: eventPageUrl(event),
    featured: !!event.featured,
    ...(event.featured && event.logo && { logo: new URL(event.logo, SITE_URL).href }),
  }));

  const body = {
    generatedAt: new Date().toISOString(),
    count: events.length,
    events,
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
