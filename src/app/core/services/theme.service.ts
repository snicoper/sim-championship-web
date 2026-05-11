import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  darkMode = signal(false);

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('dark-theme', this.darkMode());
    });
  }

  toggleTheme() {
    this.darkMode.update((v) => !v);
  }
}
