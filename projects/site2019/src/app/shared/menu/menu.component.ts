import { Component, OnInit, HostListener } from '@angular/core';
import { PageService } from '../../services/page.service';
import socialMediaList from '../../../assets/data/social-media.json';

@Component({
  selector: 'my-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isShowMobileNav = false;

  navList = [
    { link: '/schedule', name: 'Schedule' },
    { link: '/speakers', name: 'Speakers' },
    { link: '/food', name: 'Food' },
    // { link: '/sessions', name: 'Sessions' },
    // { link: '/posts', name: 'Articles' },
    // { link: '/form/speaker-training', name: 'Speaking Up!' },
    // { link: '/form/call-for-presenters', name: 'Submit CFP' },
    // { link: '/coc', name: 'Code of Conduct' },
    { link: '/team', name: 'Team' },
    // { link: '/form/scholarship', name: 'Scholarship' }
  ];

  socialMediaList = [];

  @HostListener('window:scroll', ['$event'])
  onScroll(e) {
    const maxDist = 100;
    const currentPos = window.scrollY;
    const opacity = currentPos / maxDist;
    const opacityCalc = opacity > 1 ? 1 : opacity;

    document.documentElement.style.setProperty(
      '--hero-scroll',
      `${opacityCalc}`
    );
  }

  constructor(private pageSvc: PageService) {}

  toggleMobileNav() {
    this.isShowMobileNav = !this.isShowMobileNav;
  }

  ngOnInit() {
    this.socialMediaList = socialMediaList;
  }

  trackEvent(event: string) {
    gtag('event', event + '_menu', {
      event_category: event,
      event_label: event,
      value: event
    });

    this.isShowMobileNav = false;
  }
}
