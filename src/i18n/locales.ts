export const languages = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  nl: 'Nederlands',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';
