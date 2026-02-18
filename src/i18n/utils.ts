import { ui } from './ui';
import { defaultLang, type Lang } from './locales';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang]?.[key] ?? ui[defaultLang][key] ?? key;
  };
}

export function getLocalizedPath(lang: Lang, path: string = '/'): string {
  return `/${lang}${path}`;
}
