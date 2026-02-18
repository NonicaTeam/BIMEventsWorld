import type { BIMEvent } from '../types';

export function getUpcomingEvents(events: BIMEvent[]): BIMEvent[] {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const oneYearFromNow = new Date(now);
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

  return events
    .filter((event) => {
      const endDate = new Date(event.endDate);
      const startDate = new Date(event.startDate);
      return endDate >= now && startDate <= oneYearFromNow;
    })
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
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
