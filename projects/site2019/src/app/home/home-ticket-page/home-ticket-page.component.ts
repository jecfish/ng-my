import { Component, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { PageService } from '../../services/page.service';

import sponsors from '../../../assets/data/sponsors.json';
import speakerList from '../../../assets/data/speakers.json';
import postList from '../../../assets/data/posts.json';
import { fromEvent, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';


@Component({
  selector: 'my-home-ticket-page',
  templateUrl: './home-ticket-page.component.html',
  styleUrls: ['./home-ticket-page.component.scss']
})
export class HomeTicketPageComponent implements OnInit, OnDestroy {
  @ViewChild('stats') statsElement: any;
  stats: any;

  @ViewChild('subscribe') subscribeElement: any;
  subscribe: any;

  sponsors = sponsors;
  posts = postList;
  speaker: any;
  shouldShowStats = false;
  windowScrollSub: Subscription;

  readonly TOTAL_SPEAKER = 33;

  constructor(private pageSvc: PageService) { }

  ngOnInit() {
    const title = 'July 06-07';
    this.pageSvc.setPage({ title });

    this.randomSpeaker();

    this.windowScrollSub = fromEvent(window, 'scroll').pipe(
      takeWhile(() => !this.shouldShowStats)
    ).subscribe(() => this.animateStats());
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

  private trackEvent(event: string) {
    gtag('event', event, {
      event_category: event,
      event_label: event,
      value: event
    });
  }

  randomSpeaker() {
    const num = this.pageSvc.randomNumber(this.TOTAL_SPEAKER, 0);
    const selected = speakerList[num];
    const description = `${selected.description.substr(0, 300)}${
      selected.description.length > 300 ? '...' : ''
      }`;

    this.speaker = {
      ...selected,
      description,
      food: this.pageSvc.randomFoodIcon()
    };
  }

  private animateStats() {
    const { top } = this.statsElement.nativeElement.getBoundingClientRect();
    const { innerHeight } = window;
    const trigger = top - innerHeight / 2;

    if (trigger <= 0) this.shouldShowStats = true;
  }

  ngOnDestroy(): void {
    this.windowScrollSub.unsubscribe();
  }
}
