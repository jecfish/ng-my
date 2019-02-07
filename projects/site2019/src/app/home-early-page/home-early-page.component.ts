import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { PageService } from '../services/page.service';

declare var google: any;

@Component({
  selector: 'my-home-early-page',
  templateUrl: './home-early-page.component.html',
  styleUrls: ['./home-early-page.component.css']
})
export class HomeEarlyPageComponent implements OnInit {
  title = 'July 06-07';

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

  ultimateList = [
    {
      image: 'sunwayuniversity.jpg',
      name: 'sunway university',
      url: 'https://university.sunway.edu.my/'
    }
  ];

  communityList = [
    { image: 'nestjs.svg', name: 'nestjs', url: 'https://nestjs.com/' },
    {
      image: 'WWCode_Kuala Lumpur_Binary.jpg',
      name: 'Women Who Code KL',
      url: 'https://www.facebook.com/womenwhocodekl/'
    },
    {
      image: 'sunway_tech_club.jpg',
      name: 'Sunway Tech Club',
      url: 'https://www.facebook.com/sunwaytechclub/'
    },
    {
      image: 'gdgkl.svg',
      name: 'Google Developers Group KL',
      url: 'https://www.facebook.com/GDGKualaLumpur/'
    },
    {
      image: 'kljs.png',
      name: 'Kuala Lumpur JS',
      url: 'https://www.facebook.com/groups/kualalumpurjs/'
    },
    {
      image: 'angular-malaysia.png',
      name: 'Angular Malaysia',
      url: 'https://www.facebook.com/groups/angular.malaysia/'
    },
    {
      image: 'thefrontendmalaysia.jpg',
      name: 'the Frontend Malaysia',
      url: 'https://www.facebook.com/frontendmalaysia/'
    }
  ];

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

  constructor(private pageSvc: PageService) {}

  ngOnInit() {
    this.pageSvc.setPage({ title: this.title, path: '/' });
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
}
