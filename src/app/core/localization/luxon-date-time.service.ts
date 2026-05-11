import { computed, effect, inject, Injectable } from '@angular/core';
import { Settings } from 'luxon';
import { AppEnvironment } from '../config/app-environment';
import { logInfo, logWarning } from '../errors/logger/logger';
import { LocaleService } from './locale.service';
import { parseSupportedLocale } from './localization.utils';
import { SupportedLocale } from './supported-locale.enum';
import { TimeZoneService } from './time-zone.service';

/** State for the current locale in Luxon. */
@Injectable({ providedIn: 'root' })
export class LuxonDateTimeService {
  private readonly localeStateService = inject(LocaleService);
  private readonly timeZoneStateService = inject(TimeZoneService);

  private readonly value = {
    locale: computed(() => this.localeStateService.value()),
    timeZone: computed(() => this.timeZoneStateService.value()),
  };

  initialize(): void {
    effect(() => {
      const currentLocale = this.value.locale();
      const currentTimeZone = this.value.timeZone();

      if (currentLocale && currentTimeZone) {
        this.updateLuxonSettings(currentLocale, currentTimeZone);
      }
    });
  }

  private updateLuxonSettings(locale: SupportedLocale, timeZone: string): void {
    const localeValue = parseSupportedLocale(locale) ?? AppEnvironment.DefaultLocale;

    if (localeValue !== locale.toString()) {
      logWarning(
        'LuxonDateTimeService.updateLuxonSettings',
        `Locale ${locale} not supported. Using default locale.`,
      );
    }

    Settings.defaultLocale = localeValue;
    Settings.defaultZone = timeZone;
    logInfo(
      'LuxonDateTimeService.updateLuxonSettings',
      `Settings updated - Locale: ${localeValue}, TimeZone: ${timeZone}`,
    );
  }
}
