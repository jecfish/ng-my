import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { GoogleAnalytics } from '../scripts';

if (environment.production) {
  enableProdMode();
  GoogleAnalytics.run({ trackingID: environment.gaTrackingID });
} else {
  // mock gtag
  window['gtag'] = function () {
    console.log('gtag called');
    return null;
  };
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
