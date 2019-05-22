import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { PageService } from '../../services/page.service';

import sponsors from '../../../assets/data/sponsors.json';
import speakerList from '../../../assets/data/speakers.json';
import postList from '../../../assets/data/posts.json';

@Component({
  selector: 'my-home-ticket-page',
  templateUrl: './home-ticket-page.component.html',
  styleUrls: ['./home-ticket-page.component.scss']
})
export class HomeTicketPageComponent implements OnInit {
  @ViewChild('stats') statsEl: any;

  @ViewChild('subscribe') subscribeEl: any;

  sponsors = sponsors;
  posts = postList;
  speaker: any;
  shouldShowStats = false;

  readonly TOTAL_SPEAKER = 33;

  constructor(private pageSvc: PageService) { }

  ngOnInit() {
    const title = 'July 06-07';
    this.pageSvc.setPage({ title });

    this.randomSpeaker();
  }

  scrollTo(location: string) {
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

  @HostListener('window:scroll', [])
  animateStats() {
    if (this.shouldShowStats) return;

    const { top } = this.statsEl.nativeElement.getBoundingClientRect();
    const { innerHeight } = window;
    const trigger = top - innerHeight / 2;

    if (trigger <= 0) this.shouldShowStats = true;
  }
}
