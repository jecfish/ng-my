import { Component, OnInit } from '@angular/core';
import speakerList from '../../../assets/data/speakers.json';
import sessionList from '../../../assets/data/sessions.json';
import profileIcons from '../../../assets/data/profile-url-icons.json';

import { ActivatedRoute } from '@angular/router';
import { PageService } from '../../services/page.service';
import { Meta } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { IModal } from '../../shared/modal/modal.component.js';

@Component({
  selector: 'my-session-page',
  templateUrl: './session-page.component.html',
  styleUrls: ['./session-page.component.scss']
})
export class SessionPageComponent implements OnInit {
  sessions = [];
  selectedSessionId = null;

  profileIconsModel = null;

  constructor(
    private route: ActivatedRoute,
    private meta: Meta,
    private pageSvc: PageService,
    private location: Location
  ) {}

  get selectedItem() {
    const session = this.sessions.find(x => x.id === this.selectedSessionId);

    if (!session) return null;

    const item: IModal = {
      thumbnails: session.speakers.map(x => {
        return {
          url: `/speakers/${x.id}`,
          img: `../../assets/imgs/speakers/${x.id}`,
          name: x.name,
          links: x.profile.map(p => {
            return {
              url: p.url,
              type: this.profileIconsModel[p.type]
            };
          })
        };
      }),
      title: session.title,
      desc: session.description.full
    };
    return item;
  }

  get mainSession() {
    return this.sessions.filter(x => x.type === 'main');
  }

  get chatSession() {
    return this.sessions.filter(x => x.type === 'chat');
  }

  get lightningSession() {
    return this.sessions.filter(x => x.type === 'lightning');
  }

  get workshopSession() {
    return this.sessions.filter(x => x.type === 'workshop');
  }

  ngOnInit() {
    this.sessions = sessionList
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
            .filter(x => session.speakers.includes(x.id));
          return { ...session, speakers };
        })
    ;

    this.profileIconsModel = profileIcons;
    const selectedId = this.route.snapshot.paramMap.get('id');
    this.selectSession(selectedId);
  }

  selectSession(id: any) {
    this.selectedSessionId = id;

    const path = id ? `/sessions/${id}` : '/sessions';
    this.location.go(path);

    const title = id
      ? this.selectedItem.title +
        this.pageSvc.postfix.replace('|', '| Session')
      : `Sessions${this.pageSvc.postfix}`;

    this.pageSvc.setPage({
      title,
      metaDesc: 'Sessions NG-MY 2019.',
      skipTitlePostfix: true
    });
  }

  unselectSession() {
    this.selectSession(null);
  }
}
