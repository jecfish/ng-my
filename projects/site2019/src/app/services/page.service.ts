import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  public readonly postfix = ' | NG-MY 2019';
  private trackingID = environment.gaTrackingID;

  constructor(
    private title: Title,
    private router: Router,
    private meta: Meta
  ) {}

  setPage(config: {
    title?: string;
    skipTitlePostfix?: boolean;
    metaDesc?: string;
    metaImg?: string;
  }) {
    const postfix = config.skipTitlePostfix ? '' : this.postfix;

    this.meta.updateTag({ property: 'og:url', content: this.getCurrentPath() });

    if (config.title) {
      const title = config.title + postfix;
      this.title.setTitle(title);
      this.meta.updateTag({ property: 'og:title', content: title });
    }

    if (config.metaDesc) {
      this.meta.updateTag({ name: 'description', content: config.metaDesc });
      this.meta.updateTag({ property: 'og:description', content: config.metaDesc });
    }

    if (config.metaImg) {
      this.meta.updateTag({ property: 'og:image', content: config.metaImg });
      this.meta.updateTag({ name: 'twitter:image', content: config.metaImg });
    }

    document.dispatchEvent(new Event('prerender-ready'));

    // tslint:disable-next-line
    if (!environment.production || !window['gtag']) return;

    gtag('config', this.trackingID, {
      'page-title': config.title,
      'page-path': this.getCurrentPath(false)
    });
  }

  getCurrentPath(includeBaseUrl = true) {
    const prefix = includeBaseUrl ? environment.baseUrl : '';
    return prefix + this.router.url;
  }

  scrollWindowTo(target, duration) {
    const start = window.pageYOffset;
    const dist = target - start;
    const steps = 20;
    let current = 0;

    const transitionTiming = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animateScroll = () => {
      if (current >= duration) return;

      current += steps;
      const pos = transitionTiming(current, start, dist, duration);

      window.scrollTo(0, pos);

      requestAnimationFrame(animateScroll);
    };

    animateScroll();
  }

  randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  randomFoodIcon() {
    const foodIconsModel = [
      'abc',
      'bandung',
      'cendol',
      'curry-pup',
      'nasi-lemak-ikan',
      'kopi-o',
      'limao-ice-ikat-tepi',
      'nasi-lemak',
      'roti-canai',
      'teh-tarik',
      'ikat-semua',
      'tosai'
    ];

    return foodIconsModel[this.randomNumber(foodIconsModel.length, 0)];
  }
}
