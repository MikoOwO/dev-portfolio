import { fr, type Dict } from './fr';
import { en } from './en';

export type Lang = 'fr' | 'en';
export type { Dict, GameStrings } from './fr';

export const languages: Record<Lang, { label: string; name: string; path: string }> = {
  fr: { label: 'FR', name: 'Français', path: '/' },
  en: { label: 'EN', name: 'English', path: '/en/' },
};

const dicts: Record<Lang, Dict> = { fr, en };

export function useTranslations(lang: Lang): Dict {
  return dicts[lang];
}
