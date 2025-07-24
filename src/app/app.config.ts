import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorLoggerInterceptor } from './interceptors/http-error-logger-interceptor.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PoetrydbService } from './services/poetrydb.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorLoggerInterceptor,
      multi: true,
    },
    PoetrydbService,
  ],
};
