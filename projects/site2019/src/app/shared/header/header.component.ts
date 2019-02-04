import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'my-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isShowMobileNav = false;

  navList = [
    // { link: '/logo', name: 'Logo' },
    // { link: '/speakers', name: 'Speakers' },
    // { link: '/schedule', name: 'Schedule' },
    { link: '/team', name: 'Team' }
  ]

  socialMediaList = [
    { icon: 'twitter', url: 'https://twitter.com/ngmyconf' },
    { icon: 'facebook', url: 'https://www.facebook.com/ngmyconf/' },
    { icon: 'instagram', url: 'https://www.instagram.com/ngmyconf/' },
    { icon: 'linkedin', url: 'https://www.linkedin.com/company/ngmyconf/' }
  ]

  @HostListener('window:scroll', ['$event'])
  onScroll(e) {
    const maxDist = 100;
    const currentPos = window.scrollY;
    const opacity = currentPos / maxDist;
    const opacityCalc = opacity > 1 ? 1 : opacity;

    document.documentElement.style.setProperty(
      '--shadow-opacity',
      `${opacityCalc}`
    );
  }

  constructor() { }

  toggleMobileNav() {
    this.isShowMobileNav = !this.isShowMobileNav;
  }

  ngOnInit() { }
}
