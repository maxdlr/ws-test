import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {RxStompService} from "../services/WebSockets/web-socket.service";
import {rxStompServiceFactory} from "../services/WebSockets/RxStompServiceFactory";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
    }
  ]
};
