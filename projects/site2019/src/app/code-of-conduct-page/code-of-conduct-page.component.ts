import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../services/tracking.service';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'my-code-of-conduct-page',
  templateUrl: './code-of-conduct-page.component.html',
  styleUrls: ['./code-of-conduct-page.component.scss']
})
export class CodeOfConductPageComponent implements OnInit {
  title = 'ng-MY 2019 | Code of Conduct';

  constructor(private trackingSvc: TrackingService, private titleSvc: Title) { }

  ngOnInit() {
    this.titleSvc.setTitle(this.title);

    if (environment.production) { }
  }
}
