import { Component, OnInit } from '@angular/core';
import schedule from '../../../assets/data/schedule.json';
import session from '../../../assets/data/sessions.json';
import { PageService } from '../../services/page.service.js';

@Component({
  selector: 'my-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss']
})
export class SchedulePageComponent implements OnInit {
  title = 'Schedule';

  day1 = this.getSchedule(schedule.one);

  day2 = this.getSchedule(schedule.two);

  constructor(private pageSvc: PageService) {}

  ngOnInit() {
    this.pageSvc.setPage({
      title: this.title,
      metaDesc: 'Agenda of the days.'
    });
  }

  getSchedule(item) {
    const sessionIds = session.map(x => x.id);
    return Object.entries(item).map(([time, items = [] as any]) => ({
      time,
      items: items.map(x =>
        !x.speakers
          ? x
          : {
              ...x,
              hasSessionInfo: sessionIds.includes(x.session)
            }
      )
    }));
  }
}
