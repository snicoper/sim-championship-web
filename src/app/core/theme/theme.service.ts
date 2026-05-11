import { inject, Injectable, signal } from '@angular/core';

import { BrowserStorageKey } from '../browser-storage/browser-storage-key.enum';
import { BrowserStorageService } from '../browser-storage/browser-storage.service';
import { ThemeColor } from './theme-color.enum';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly browserStorage = inject<BrowserStorageService>(BrowserStorageService);

  private readonly selectedTheme = signal<ThemeColor>(ThemeColor.Auto);

  readonly theme = this.selectedTheme.asReadonly();

  load(): void {
    const storedTheme = this.browserStorage.get(BrowserStorageKey.Theme);

    const theme = this.isThemeColor(storedTheme) ? storedTheme : ThemeColor.Auto;

    this.set(theme);
  }

  set(theme: ThemeColor): void {
    this.selectedTheme.set(theme);
    this.browserStorage.set(BrowserStorageKey.Theme, theme);
    this.applyTheme(theme);
  }

  toggle(): void {
    const currentTheme = this.resolveTheme(this.selectedTheme());

    const nextTheme = currentTheme === ThemeColor.Dark ? ThemeColor.Light : ThemeColor.Dark;

    this.set(nextTheme);
  }

  private applyTheme(theme: ThemeColor): void {
    const resolvedTheme = this.resolveTheme(theme);

    document.documentElement.classList.toggle('dark-theme', resolvedTheme === ThemeColor.Dark);
    document.documentElement.classList.toggle('light-theme', resolvedTheme === ThemeColor.Light);
  }

  private resolveTheme(theme: ThemeColor): ThemeColor.Light | ThemeColor.Dark {
    if (theme !== ThemeColor.Auto) {
      return theme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? ThemeColor.Dark
      : ThemeColor.Light;
  }

  private isThemeColor(value: string | null): value is ThemeColor {
    return Object.values(ThemeColor).includes(value as ThemeColor);
  }
}
