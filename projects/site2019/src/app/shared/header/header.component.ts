import { Component, OnInit, HostListener } from '@angular/core';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'my-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isShowMobileNav = false;

  navList = [
    // { link: '/logo', name: 'Logo' },
    // { link: '/speakers', name: 'Speakers' },
    // { link: '/schedule', name: 'Schedule' },
    { link: '/team', name: 'Team' },
    { link: '/coc', name: 'Code of Conduct' }
  ];

  socialMediaList = [];

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

  constructor(private pageSvc: PageService) {}

  toggleMobileNav() {
    this.isShowMobileNav = !this.isShowMobileNav;
  }

  ngOnInit() {
    this.socialMediaList = this.pageSvc.getSocialMediaList();
  }
}
