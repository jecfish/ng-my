import { Component, OnInit } from '@angular/core';
import schedule from '../../../assets/data/schedule.json';
import speakerList from '../../../assets/data/speakers.json';
import sessionList from '../../../assets/data/sessions.json';
import profileIcons from '../../../assets/data/profile-url-icons.json';
import { PageService } from '../../services/page.service.js';
import { IModal } from '../../shared/modal/modal.component.js';

@Component({
  selector: 'my-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss']
})
export class SchedulePageComponent implements OnInit {
  title = 'Schedule';

  day1 = this.getSchedule(schedule.one);

  day2 = this.getSchedule(schedule.two);

  sessions = [];

  selectedSessionId = null;

  get selectedItem() {
    const session = this.sessions.find(x => x.id === this.selectedSessionId);

    if (!session) return null;

    const item: IModal = {
      thumbnails: session.speakers.map(x => {
        return {
          url: '',
          img: `../../assets/imgs/speakers/${x.id}.jpg`,
          name: x.name,
          links: x.profile.map(p => {
            return {
              url: p.url,
              type: profileIcons[p.type]
            };
          })
        };
      }),
      title: session.title,
      desc: session.description.full
    };
    return item;
  }

  constructor(private pageSvc: PageService) { }

  ngOnInit() {
    this.pageSvc.setPage({
      title: this.title,
      metaDesc: 'Agenda of the days.'
    });

    this.sessions = this.sessions = sessionList
      .map(x => ({
        ...x,
        ...{
          description: {
            short: `${x.description.substr(0, 160)}${
              x.description.length > 160 ? '...' : ''
              }`,
            full: x.description
          }
        }
      }))
      .map(session => {
        const speakers = speakerList
          .map(x => ({
            ...x,
            ...{
              food: this.pageSvc.randomFoodIcon()
            }
          }))
          .filter(x => session.speakers.includes(x.id));
        return { ...session, speakers };
      })
      ;
  }

  getSchedule(item) {
    const sessionIds = sessionList.map(x => x.id);
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

  selectSession(id) {
    console.log(id);
    this.selectedSessionId = id;
  }

  unselectSession() {
    this.selectedSessionId = null;
  }
}
