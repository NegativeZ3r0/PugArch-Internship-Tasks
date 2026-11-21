// theme.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'dark-mode';
  isDark = signal<boolean>(false);

  constructor() {
    this.initTheme();
  }

  private initTheme() {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);

    if (savedTheme !== null) {
      // Use the user's saved preference
      this.setDarkTheme(savedTheme === 'true');
    } else {
      // Fall back to system preference if no choice has been saved yet
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setDarkTheme(prefersDark);
    }
  }

  setDarkTheme(shouldAdd: boolean): void {
    this.isDark.set(shouldAdd);
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
    localStorage.setItem(this.STORAGE_KEY, String(shouldAdd));
  }
}
