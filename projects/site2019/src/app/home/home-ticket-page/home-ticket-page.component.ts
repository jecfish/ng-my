import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { PageService } from '../../services/page.service';

import communities from '../../../assets/data/community-partners.json';
import ultimates from '../../../assets/data/sponsors-ultimate.json';
import golds from '../../../assets/data/sponsors-gold.json';
import silvers from '../../../assets/data/sponsors-silver.json';
import miscs from '../../../assets/data/sponsors-misc.json';
import medias from '../../../assets/data/sponsors-media.json';
import bronzes from '../../../assets/data/sponsors-bronze.json';

import speakerList from '../../../assets/data/speakers.json';
import postList from '../../../assets/data/posts.json';

@Component({
  selector: 'my-home-ticket-page',
  templateUrl: './home-ticket-page.component.html',
  styleUrls: ['./home-ticket-page.component.scss']
})
export class HomeTicketPageComponent implements OnInit {
  @ViewChild('stats') statsElement: any;
  stats: any;

  @ViewChild('subscribe') subscribeElement: any;
  subscribe: any;

  shouldShowSection = {
    stats: false,
    mailing: false,
    speakers: false,
    agenda: false,
    posts: false,
    sponsors: false
  };

  sponsors = [
    {
      level: 'ultimate',
      title: 'Ultimate sponsors',
      list: ultimates
    },
    {
      level: 'gold',
      title: 'Gold sponsors',
      list: golds
    },
    {
      level: 'silver',
      title: 'Silver sponsors',
      list: silvers
    },
    {
      level: 'misc',
      title: 'Coffee sponsors',
      list: miscs.filter(x => x.type === 'coffee')
    },
    {
      level: 'misc',
      title: 'Meal sponsors',
      list: miscs.filter(x => x.type === 'meal')
    },
    {
      level: 'misc',
      title: 'Scholarship sponsors',
      list: miscs.filter(x => x.type === 'scholarship')
    },
    {
      level: 'bronze',
      title: 'Bronze sponsors',
      list: bronzes
    },
    {
      level: 'misc',
      title: 'Media partners',
      list: medias
    },
    {
      level: 'community',
      title: 'Community partners',
      list: communities
    }
  ];

  posts = [];

  speakers = [];

  currentSpeaker = 0;

  shouldShowStats = false;

  get speaker() {
    return this.speakers[this.currentSpeaker] || {};
  }

  get fewPosts() {
    return this.posts.slice(0, 3);
  }

  @HostListener('window:scroll', ['$event'])
  doSomething(event) {
    if (this.shouldShowStats) {
      return;
    }

    const { top } = this.statsElement.nativeElement.getBoundingClientRect();
    const { innerHeight } = window;
    const trigger = top - innerHeight / 2;

    if (trigger <= 0) {
      this.shouldShowStats = true;
    }
  }

  constructor(private pageSvc: PageService) {}

  ngOnInit() {
    const title = 'July 06-07';
    this.pageSvc.setPage({ title });
    this.speakers = speakerList.map(x => ({
      ...x,
      ...{
        description: `${x.description.substr(0, 300)}${
          x.description.length > 300 ? '...' : ''
        }`,
        food: this.pageSvc.randomFoodIcon()
      }
    }));

    this.randomSpeaker();
    this.posts = Object.keys(postList).reduce(
      (list, url) => [
        ...list,
        {
          url,
          ...postList[url]
        }
      ],
      []
    );
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

  randomSpeaker() {
    this.currentSpeaker = this.pageSvc.randomNumber(this.speakers.length, 0);
  }
}
