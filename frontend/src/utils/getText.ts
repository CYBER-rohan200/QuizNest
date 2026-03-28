export type Language = 'en' | 'hi' | 'te';

export type MultilingualText = {
  en: string;
  hi?: string;
  te?: string;
};

export const getText = (text: MultilingualText | string, lang: Language): string => {
  if (!text) return '';
  if (typeof text === 'string') {
    return text;
  }
  return text[lang] || text.en;
};
