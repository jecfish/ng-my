import { Component, OnInit } from '@angular/core';
import speakerList from '../../assets/data/speakers.json';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../services/page.service';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';
import profileIcons from '../../assets/data/profile-url-icons.json';

@Component({
  selector: 'my-speakers-page',
  templateUrl: './speakers-page.component.html',
  styleUrls: ['./speakers-page.component.css']
})
export class SpeakersPageComponent implements OnInit {
  memberList = [];
  selectedMemberId = null;

  profileIconsModel = null;

  get teamMembers() {
    return this.memberList;
  }

  get selectedMember() {
    return this.memberList.find(x => x.id === this.selectedMemberId);
  }

  constructor(
    private route: ActivatedRoute,
    private pageSvc: PageService,
    private location: Location
  ) {}

  ngOnInit() {
    this.memberList = speakerList.map(x => ({
      ...x,
      ...{
        food: this.pageSvc.randomFoodIcon()
      }
    }));
    const selectedMemberId = this.route.snapshot.paramMap.get('id');
    this.selectMember(selectedMemberId);
  }

  selectMember(id) {
    this.selectedMemberId = id;

    const path = id ? `/speakers/${id}` : '/speakers';
    this.location.go(path);

    const title = id
      ? this.selectedMember.name +
        this.pageSvc.postfix.replace('|', '| Speaker')
      : `Featured Speakers${this.pageSvc.postfix}`;

    this.pageSvc.setPage({
      title,
      metaDesc: 'Featured Speakers NG-MY 2019.',
      metaImg: id
        ? environment.baseUrl +
          '/assets/imgs/speakers/' +
          this.selectedMember.id +
          '.jpg'
        : environment.baseUrl + '/assets/imgs/speakers/_featured-speakers.jpg',
      skipTitlePostfix: true
    });

    this.profileIconsModel = profileIcons;
  }

  unselectMember() {
    this.selectMember(null);
  }
}
