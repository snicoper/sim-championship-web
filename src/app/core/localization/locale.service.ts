import { Injectable, computed, inject, signal } from '@angular/core';
import { BrowserStorageKey } from '../browser-storage/browser-storage-key.enum';
import { BrowserStorageService } from '../browser-storage/browser-storage.service';
import { defaultLocale, parseSupportedLocale } from './localization.utils';
import { SupportedLocale } from './supported-locale.enum';

/** State for the current locale. */
@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly browserStorage = inject(BrowserStorageService);

  private readonly supportedLocale = signal<SupportedLocale>(defaultLocale);

  readonly value = computed(() => this.supportedLocale());

  initialize(): void {
    const storedLocale = parseSupportedLocale(this.browserStorage.get(BrowserStorageKey.Locale));
    const localeSupported = storedLocale ?? defaultLocale;

    this.set(localeSupported);
  }

  set(locale: SupportedLocale): void {
    this.supportedLocale.set(locale);
    this.saveLocaleToStorage(locale);
  }

  get(): SupportedLocale {
    return this.supportedLocale();
  }

  private saveLocaleToStorage(locale: SupportedLocale): void {
    this.browserStorage.set(BrowserStorageKey.Locale, locale);
  }
}
