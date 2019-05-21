import { Component, OnInit, HostListener } from '@angular/core';
import socialMediaList from '../../../assets/data/social-media.json';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'my-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isShowMobileNav = false;

  navList = [
    { link: '/schedule', name: 'Schedule' },
    { link: '/speakers', name: 'Speakers' },
    { link: '/sessions', name: 'Sessions' },
    // { link: '/posts', name: 'Articles' },
    // { link: '/form/speaker-training', name: 'Speaking Up!' },
    // { link: '/form/call-for-presenters', name: 'Submit CFP' },
    // { link: '/coc', name: 'Code of Conduct' },
    { link: '/team', name: 'Team' }
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

  constructor(private router: Router) {}

  toggleMobileNav() {
    this.isShowMobileNav = !this.isShowMobileNav;
  }

  ngOnInit() {
    this.socialMediaList = socialMediaList;

    this.router.events.subscribe(
      e => e instanceof NavigationEnd && (this.isShowMobileNav = false)
    );
  }

  trackEvent(event: string) {
    gtag('event', event + '_menu', {
      event_category: event,
      event_label: event,
      value: event
    });
  }
}
