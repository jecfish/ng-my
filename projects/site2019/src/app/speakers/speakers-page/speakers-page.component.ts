import { Component, OnInit } from '@angular/core';
import speakerList from '../../../assets/data/speakers.json';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../../services/page.service';
import { Location } from '@angular/common';
import { environment } from '../../../environments/environment';
import profileIcons from '../../../assets/data/profile-url-icons.json';
import { IModal } from '../../shared/modal/modal.component.js';

@Component({
  selector: 'my-speakers-page',
  templateUrl: './speakers-page.component.html',
  styleUrls: ['./speakers-page.component.scss']
})
export class SpeakersPageComponent implements OnInit {
  speakerList = [];
  selectedSpeakerId = null;

  profileIconsModel = null;

  get selectedItem() {
    const speaker = this.speakerList.find(x => x.id === this.selectedSpeakerId);

    if (!speaker) return null;

    const item: IModal = {
      thumbnails: [
        {
          url: `/speakers/${speaker.id}`,
          img: `../../assets/imgs/speakers/${speaker.id}`,
          name: speaker.name,
          links: speaker.profile.map(p => {
            return {
              url: p.url,
              type: this.profileIconsModel[p.type]
            };
          })
        }
      ],
      title: speaker.title,
      desc: speaker.description
    };
    return item;
  }

  constructor(
    private route: ActivatedRoute,
    private pageSvc: PageService,
    private location: Location
  ) {}

  ngOnInit() {
    this.profileIconsModel = profileIcons;
    this.speakerList = speakerList.map(x => ({
      ...x,
      ...{
        food: this.pageSvc.randomFoodIcon()
      }
    }));
    const selected = this.route.snapshot.paramMap.get('id');
    this.selectSpeaker(selected, false);
  }

  selectSpeaker(id, shouldRedirect = true) {
    this.selectedSpeakerId = id;

    const path = id ? `/speakers/${id}` : '/speakers';
    if (shouldRedirect) this.location.go(path);

    const title = id
      ? this.selectedItem.thumbnails[0].name +
        this.pageSvc.postfix.replace('|', '| Speaker')
      : `Featured Speakers${this.pageSvc.postfix}`;

    this.pageSvc.setPage({
      title,
      metaDesc: 'Featured Speakers NG-MY 2019.',
      metaImg: id
        ? environment.baseUrl +
          '/assets/imgs/speakers/' +
          this.selectedSpeakerId.id +
          '.jpg'
        : environment.baseUrl + '/assets/imgs/speakers/_featured-speakers.jpg',
      skipTitlePostfix: true
    });
  }

  unselectSpeaker() {
    this.selectSpeaker(null);
  }
}
