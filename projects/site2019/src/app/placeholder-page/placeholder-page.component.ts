import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../services/tracking.service';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'my-placeholder-page',
  templateUrl: './placeholder-page.component.html',
  styleUrls: ['./placeholder-page.component.scss']
})
export class PlaceholderPageComponent implements OnInit {
  title = 'ng-MY 2019';

  constructor(private trackingSvc: TrackingService, private titleSvc: Title) { }

  ngOnInit() {
    this.titleSvc.setTitle(this.title);

    if (environment.production) {
      this.trackingSvc.setPage({ pageTitle: this.title, pagePath: '/' });
    }
  }
}
