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
    shouldShowStats: false,
    sponsors: {
      ultimate: [
        {
          image: '../../assets/imgs/sponsors/sunwayuniversity.jpg',
          url: 'https://university.sunway.edu.my/'
        }
      ]
    },
    partners: [
      {
        image: '../../assets/imgs/sponsors/nestjs.svg',
        url: 'https://nestjs.com/'
      },
      {
        image: '../../assets/imgs/sponsors/WWCode_Kuala Lumpur_Binary.jpg',
        url: 'https://www.facebook.com/womenwhocodekl/'
      },
      {
        image: '../../assets/imgs/sponsors/sunway_tech_club.jpg',
        url: 'https://www.facebook.com/sunwaytechclub/'
      },
      {
        image: '../../assets/imgs/sponsors/gdgkl.svg',
        url: 'https://www.facebook.com/GDGKualaLumpur/'
      },
      {
        image: '../../assets/imgs/sponsors/thefrontendmalaysia.jpg',
        url: 'https://www.facebook.com/frontendmalaysia/'
      }
    ]
  };

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

    const mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProp);
  }

  scrollTo(location) {
    const getTop = e => e.getBoundingClientRect().top;
    const elModel = {
      speakers: this.speakersElement.nativeElement,
      sponsoring: this.sponsoringElement.nativeElement
    };

    if (!elModel[location]) {
      return;
    }

    const headerHeight = 60;
    const target = getTop(elModel[location]) - window.scrollY - headerHeight;

    this.pageSvc.scrollWindowTo(target, 1000);
  }
}
