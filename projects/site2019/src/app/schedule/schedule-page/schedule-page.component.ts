import { Component, OnInit } from '@angular/core';
import schedule from '../../../assets/data/schedule.json';
import { PageService } from '../../services/page.service.js';

@Component({
  selector: 'my-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss']
})
export class SchedulePageComponent implements OnInit {

  title = 'Schedule';

  day1 = Object.entries(schedule.one)
    .map(([time, items]) => ({ time, items }));

  day2 = Object.entries(schedule.two)
  .map(([time, items]) => ({ time, items }));

  constructor(private pageSvc: PageService) { }

  ngOnInit() {
    this.pageSvc.setPage({
      title: this.title,
      metaDesc: 'Schedule'
    });
  }

}
