import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  enableProdMode,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from '@app/app-routing';
import { AppComponent } from '@app/app.component';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRootStore } from '@root-store/root-store.module';
import { environment } from './environment/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      connectInZone: true,
    }),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    ...provideRootStore,
  ],
}).catch((err) => console.error(err));

// platformBrowser()
//   .bootstrapModule(AppModule, {
//     applicationProviders: [provideZoneChangeDetection()],
//     providers: [],
//   })
//   .catch((err) => console.error(err));
