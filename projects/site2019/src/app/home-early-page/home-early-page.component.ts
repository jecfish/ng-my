import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { PageService } from '../services/page.service';

import communities from '../../assets/data/community-partners.json';
import ultimates from '../../assets/data/sponsors-ultimate.json';
// import golds from '../../assets/data/sponsors-gold.json';
// import silvers from '../../assets/data/sponsors-silver.json';
import miscs from '../../assets/data/sponsors-misc.json';
import bronzes from '../../assets/data/sponsors-bronze.json';

declare var google: any;

@Component({
  selector: 'my-home-early-page',
  templateUrl: './home-early-page.component.html',
  styleUrls: ['./home-early-page.component.css']
})
export class HomeEarlyPageComponent implements OnInit {
  @ViewChild('map') mapElement: any;
  map: any;

  @ViewChild('stats') statsElement: any;
  stats: any;

  @ViewChild('subscribe') subscribeElement: any;
  subscribe: any;

  model = {
    shouldShowStats: false
  };

  sponsors = [
    {
      level: 'ultimate',
      title: 'Ultimate sponsors',
      list: ultimates
    },
    // {
    //   level: 'gold',
    //   title: 'Ultimate sponsors',
    //   list: golds
    // },
    // {
    //   level: 'silver',
    //   title: 'Ultimate sponsors',
    //   list: silvers
    // },
    {
      level: 'misc',
      title: 'Meal sponsors',
      list: miscs
    },
    {
      level: 'bronze',
      title: 'Bronze sponsors',
      list: bronzes
    },
    {
      level: 'community',
      title: 'Community partners',
      list: communities
    }
  ];

  notificationMessage = '';

  get hasBackgroundSponsors() {
    return ['scotch'];
  }

  @HostListener('window:scroll', ['$event'])
  doSomething(event) {
    if (this.model.shouldShowStats) {
      return;
    }

    const { top } = this.statsElement.nativeElement.getBoundingClientRect();
    const { innerHeight } = window;
    const trigger = top - innerHeight / 2;

    if (trigger <= 0) {
      this.model.shouldShowStats = true;
    }
  }

  constructor(private pageSvc: PageService) {}

  ngOnInit() {
    const title = 'July 06-07';
    this.pageSvc.setPage({ title: title });
  }

  scrollTo(location) {
    const getTop = e => e.getBoundingClientRect().top;
    const elModel = {
      stats: this.statsElement.nativeElement,
      subscribe: this.subscribeElement.nativeElement
    };

    if (!elModel[location]) {
      return;
    }

    const headerHeight = 60;
    const target = getTop(elModel[location]) + window.scrollY - headerHeight;

    this.trackEvent(location);

    this.pageSvc.scrollWindowTo(target, 1000);
  }

  trackEvent(event: string) {
    gtag('event', event, {
      event_category: event,
      event_label: event,
      value: event
    });
  }
}
