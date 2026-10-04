export interface BIMEvent {
  id: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
  startDate: string;
  endDate: string;
  mode: 'in-person' | 'online' | 'hybrid';
  url: string;
  emoji: string;
  size?: 'normal' | 'large';
  /** Paid placement: shown in the Featured section and as a gold star on the globe */
  featured?: boolean;
  /** Logo shown on the featured card, e.g. "/logos/my-event.svg" (file in public/) */
  logo?: string;
  description: Record<string, string>;
}
