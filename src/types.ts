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
  description: Record<string, string>;
}
