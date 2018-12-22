import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  private trackingID = environment.gaTrackingID;

  constructor() { }

  setPage(config: { pageTitle: string; pagePath: string; }) {
    gtag('config', this.trackingID, {
      'page-title': config.pageTitle,
      'page-path': config.pagePath
    });
  }
}
