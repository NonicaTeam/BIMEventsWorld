import type { BIMEvent } from '../types';

export const SITE_URL = 'https://bimeventsworld.com';

/** Today as "YYYY-MM-DD" in UTC, the same format as startDate/endDate in events.json */
function todayUTC(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Events that have not ended yet (endDate >= today, UTC) and start within the next 12 months.
 * Runs at build time; the site rebuilds daily so the static HTML only lists upcoming events.
 */
export function getUpcomingEvents(events: BIMEvent[]): BIMEvent[] {
  const today = todayUTC();
  const oneYearFromNow = new Date();
  oneYearFromNow.setUTCFullYear(oneYearFromNow.getUTCFullYear() + 1);
  const cutoff = oneYearFromNow.toISOString().slice(0, 10);

  return events
    .filter((event) => event.endDate >= today && event.startDate <= cutoff)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

/** Featured events first, then by start date */
export function sortFeaturedFirst(events: BIMEvent[]): BIMEvent[] {
  return [...events].sort(
    (a, b) => Number(!!b.featured) - Number(!!a.featured) || a.startDate.localeCompare(b.startDate)
  );
}

export function eventPageUrl(event: BIMEvent, lang = 'en'): string {
  return `${SITE_URL}/${lang}/events/${event.id}/`;
}

/** Description in the given language, falling back to English. Undefined if the event has none. */
export function eventDescription(event: BIMEvent, lang: string): string | undefined {
  return event.description?.[lang] || event.description?.en || undefined;
}

export function formatDateRange(startDate: string, endDate: string, lang: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const locale = lang === 'en' ? 'en-US' : lang;
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };

  if (startDate === endDate) {
    return start.toLocaleDateString(locale, opts);
  }

  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.toLocaleDateString(locale, { month: 'short', day: 'numeric' })} - ${end.getDate()}, ${end.getFullYear()}`;
  }

  return `${start.toLocaleDateString(locale, { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString(locale, opts)}`;
}
