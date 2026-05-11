import { inject, Injectable } from '@angular/core';
import { logError, logInfo } from '../errors/logger/logger';
import { ThemeService } from '../theme/theme.service';

/** Configuración inicial de la aplicación. */
@Injectable({ providedIn: 'root' })
export class AppInitializer {
  private readonly themeService = inject(ThemeService);

  async load(): Promise<void> {
    try {
      this.themeService.load();

      logInfo('AppInitializer.load', 'Application initialized successfully');
    } catch (error) {
      logError('AppInitializer.load', 'Error initializing application', error);
      throw error;
    }
  }
}
