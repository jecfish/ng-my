import { Component, OnInit, ViewChild } from '@angular/core';
import { PageService } from '../../services/page.service';

import sponsors from '../../../assets/data/sponsors.json';
import speaker from '../../../assets/data/speaker-home.json';
// import postList from '../../../assets/data/posts.json';

@Component({
  selector: 'my-post-event',
  templateUrl: './post-event.component.html',
  styleUrls: ['./post-event.component.scss']
})
export class PostEventComponent implements OnInit {
  @ViewChild('lookback', { static: true }) lookbackEl: any;
  @ViewChild('subscribe', { static: true }) subscribeEl: any;

  sponsors = sponsors;
  // posts = postList;
  speaker: any;
  photos = Array.from({ length: 33 }).map((_, i) => i + 1);

  constructor(private pageSvc: PageService) {}

  ngOnInit() {
    const title = 'July 06-07';
    this.pageSvc.setPage({ title });

    this.randomSpeaker();
  }

  scrollTo(location: string) {
    // console.log('TCL: PostEventComponent -> scrollTo -> location', location);
    const getTop = (e: any) => e.getBoundingClientRect().top;

    const el = (this[location] as any).nativeElement;
    const headerHeight = 60;
    const target = getTop(el) + window.scrollY - headerHeight;

    this.trackEvent(location);
    this.pageSvc.scrollWindowTo(target, 1000);
  }

  private trackEvent(event: string) {
    gtag('event', event, {
      event_category: event,
      event_label: event,
      value: event
    });
  }

  private randomSpeaker() {
    const selected = speaker;
    const description = `${selected.description.substr(0, 300)}${
      selected.description.length > 300 ? '...' : ''
    }`;

    this.speaker = {
      ...selected,
      description
    };
  }
}