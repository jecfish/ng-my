import { Component, OnInit } from '@angular/core';
import speakerList from '../../assets/data/speakers.json';
import sessionList from '../../assets/data/sessions.json';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../services/page.service';
import { Meta } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'my-session-page',
  templateUrl: './session-page.component.html',
  styleUrls: ['./session-page.component.scss']
})
export class SessionPageComponent implements OnInit {
  day = 1;
  sessionList = [];
  selectedSessionId = null;

  profileIconsModel = {
    website: 'fas fa-globe-asia',
    linkedin: 'fab fa-linkedin',
    facebook: 'fab fa-facebook',
    twitter: 'fab fa-twitter'
  };

  constructor(
    private route: ActivatedRoute,
    private meta: Meta,
    private pageSvc: PageService,
    private location: Location
  ) {}

  get selectedSession() {
    return this.sessionList.find(x => x.id === this.selectedSessionId);
  }

  ngOnInit() {
    this.sessionList = sessionList
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
        const { id } = session;
        const speaker = speakerList.find(x => x.id === id) || {
          id: '',
          name: '',
          title: ''
        };
        return { ...session, speaker };
      });
  }

  selectSession(id) {
    this.selectedSessionId = id;

    const path = id ? `/sessions/${id}` : '/sessions';
    this.location.go(path);

    const title = id
      ? this.selectedSession.title +
        this.pageSvc.postfix.replace('|', '| Sessions')
      : `Sessions${this.pageSvc.postfix}`;

    this.pageSvc.setPage({
      title,
      metaDesc: 'Sessions NG-MY 2019.',
      metaImg: id
        ? environment.baseUrl +
          '/assets/imgs/speakers/' +
          this.selectedSession.id +
          '.jpg'
        : environment.baseUrl + '/assets/imgs/speakers/_featured-speakers.jpg',
      skipTitlePostfix: true
    });
  }

  unselectSession() {
    this.selectSession(null);
  }

  setSessionDay(day) {
    this.day = day;
  }
}
