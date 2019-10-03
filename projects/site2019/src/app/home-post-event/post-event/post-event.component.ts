import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { PageService } from '../../services/page.service';

import sponsors from '../../../assets/data/sponsors.json';
import speaker from '../../../assets/data/speaker-home.json';
import { fromEvent, timer } from 'rxjs';
import { take } from 'rxjs/operators';
// import postList from '../../../assets/data/posts.json';

@Component({
  selector: 'my-post-event',
  templateUrl: './post-event.component.html',
  styleUrls: ['./post-event.component.scss']
})
export class PostEventComponent implements OnInit {
  @ViewChild('lookback', { static: false }) lookbackEl: any;
  @ViewChild('subscribe', { static: false }) subscribeEl: any;

  sponsors = sponsors;
  // posts = postList;
  speaker = speaker;
  photos = Array.from({ length: 33 }).map((_, i) => i + 1);
  showBody = false;

  constructor(private pageSvc: PageService) {}

  ngOnInit() {
    const title = 'July 06-07';
    this.pageSvc.setPage({ title });

    fromEvent(window, 'scroll').pipe(
      take(1),
    ).subscribe(() => {
      this.showBody = true;
    });
  }

  scrollTo(location: string) {
    if (!this.showBody) this.showBody = true;
    // console.log('TCL: PostEventComponent -> scrollTo -> location', location);
    timer(1).pipe(take(1)).subscribe(() => {
      const getTop = (e: any) => e.getBoundingClientRect().top;

      const el = (this[location] as any).nativeElement;
      const headerHeight = 60;
      const target = getTop(el) + window.scrollY - headerHeight;

      this.trackEvent(location);
      this.pageSvc.scrollWindowTo(target, 1000);
    });
  }

  private trackEvent(event: string) {
    gtag('event', event, {
      event_category: event,
      event_label: event,
      value: event
    });
  }
}
