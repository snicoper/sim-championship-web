import { Injectable } from '@angular/core';
import { BrowserStorageKey } from './browser-storage-key.enum';

@Injectable({ providedIn: 'root' })
export class BrowserStorageService {
  set(key: BrowserStorageKey, value: string): void {
    localStorage.setItem(key, value);
  }

  get(key: BrowserStorageKey): string | null {
    return localStorage.getItem(key);
  }

  setObject<T>(key: BrowserStorageKey, obj: T): void {
    const value = JSON.stringify(obj);
    this.set(key, value);
  }

  getParsed<T>(key: BrowserStorageKey): T | null {
    const value = this.get(key);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch {
      this.remove(key);

      return null;
    }
  }

  remove(key: BrowserStorageKey): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
