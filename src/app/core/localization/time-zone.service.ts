import { inject, Injectable, signal } from '@angular/core';
import { BrowserStorageKey } from '../browser-storage/browser-storage-key.enum';
import { BrowserStorageService } from '../browser-storage/browser-storage.service';
import { defaultTimezone } from './localization.utils';

@Injectable({ providedIn: 'root' })
export class TimeZoneService {
  private readonly browserStorage = inject(BrowserStorageService);

  private readonly timeZone = signal('');

  readonly value = this.timeZone.asReadonly();

  initialize(): void {
    const storedTimeZone = this.getStoredTimeZone();
    const timeZone = storedTimeZone ?? defaultTimezone;

    this.set(timeZone);
  }

  set(timezone: string): void {
    this.timeZone.set(timezone);
    this.saveTimeZoneToStorage(timezone);
  }

  get(): string {
    return this.timeZone();
  }

  private getStoredTimeZone(): string | null {
    return this.browserStorage.get(BrowserStorageKey.TimeZone);
  }

  private saveTimeZoneToStorage(timezone: string): void {
    this.browserStorage.set(BrowserStorageKey.TimeZone, timezone);
  }
}
