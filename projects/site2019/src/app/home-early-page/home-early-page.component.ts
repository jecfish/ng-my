import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { PageService } from '../services/page.service';

import communities from '../../assets/data/community-partners.json';
import ultimates from '../../assets/data/sponsors-ultimate.json';

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

  @ViewChild('speakers') speakersElement: any;
  speakers: any;

  @ViewChild('sponsoring') sponsoringElement: any;
  sponsoring: any;

  model = {
    shouldShowStats: false
  };

  ultimateList = ultimates;

  communityList = communities;

  notificationMessage = '';

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

  constructor(private pageSvc: PageService) { }

  ngOnInit() {
    const title = 'July 06-07';
    this.pageSvc.setPage({ title: title });
  }

  scrollTo(location) {
    const getTop = e => e.getBoundingClientRect().top;
    const elModel = {
      stats: this.statsElement.nativeElement,
      speakers: this.speakersElement.nativeElement,
      sponsoring: this.sponsoringElement.nativeElement
    };

    if (!elModel[location]) {
      return;
    }

    const headerHeight = 60;
    const target = getTop(elModel[location]) - window.scrollY - headerHeight;

    gtag('event', location, {
      event_category: 'hero',
      event_label: location,
      value: location
    });

    this.pageSvc.scrollWindowTo(target, 1000);
  }

  saveDate() {}
}
