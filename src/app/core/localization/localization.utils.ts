import { AppEnvironment } from '../config/app-environment';
import { SupportedLocale } from './supported-locale.enum';

export const defaultLocale = getDefaultLocale();

export const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export function mapLocaleToLibraryFormat(locale: SupportedLocale): string {
  const localeMap: Record<SupportedLocale, string> = {
    [SupportedLocale.es]: 'es',
    [SupportedLocale.esES]: 'es',
    [SupportedLocale.en]: 'en',
    [SupportedLocale.enUS]: 'en',
  } as const;

  return localeMap[locale];
}

export function parseSupportedLocale(value: string | null): SupportedLocale | null {
  if (!value) {
    return null;
  }

  const normalizedValue = value.trim().toLowerCase();

  return (
    Object.values(SupportedLocale).find((locale) => locale.toLowerCase() === normalizedValue) ??
    null
  );
}

export function toString(locale: SupportedLocale): string {
  return locale.toString();
}

export function isSupported(locale: string): boolean {
  return parseSupportedLocale(locale) !== null;
}

function getDefaultLocale(): SupportedLocale {
  const browserLocale = Intl.DateTimeFormat().resolvedOptions().locale;
  const supported = parseSupportedLocale(browserLocale);

  return supported ?? AppEnvironment.DefaultLocale;
}
