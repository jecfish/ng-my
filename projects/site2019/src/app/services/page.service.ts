import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  public readonly postfix = ' | NG-MY 2019';
  private trackingID = environment.gaTrackingID;

  constructor(private title: Title) { }

  setPage(config: { title: string; path: string; skipTitlePostfix?: boolean }) {
    const postfix = config.skipTitlePostfix ? '' : this.postfix;
    this.title.setTitle(config.title + postfix);

    if (!environment.production || !window['gtag']) return;

    gtag('config', this.trackingID, {
      'page-title': config.title,
      'page-path': config.path
    });
  }
}
