import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideNgxMask({})]
};
