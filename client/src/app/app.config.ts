import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CORE_PROVIDERS } from './core/core.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    ...CORE_PROVIDERS,
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
