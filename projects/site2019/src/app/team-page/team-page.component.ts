import { Component, OnInit } from '@angular/core';
import memberList from '../../assets/data/members.json';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../services/page.service';
import { Meta } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'my-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {
  memberList = [];
  organizers = ['jecelyn-yeen'];
  selectedMemberId = null;

  profileIconsModel = {
    website: 'fas fa-globe-asia',
    linkedin: 'fab fa-linkedin',
    facebook: 'fab fa-facebook',
    twitter: 'fab fa-twitter'
  };

  get organizerMembers() {
    return this.memberList.filter(x => this.organizers.includes(x.id));
  }

  get teamMembers() {
    return this.memberList.filter(x => !this.organizers.includes(x.id));
  }

  get selectedMember() {
    return this.memberList.find(x => x.id === this.selectedMemberId);
  }

  constructor(
    private route: ActivatedRoute,
    private meta: Meta,
    private pageSvc: PageService,
    private location: Location
  ) { }

  ngOnInit() {
    this.memberList = memberList.map(x => ({
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

    const path = id ? `/team/${id}` : '/team';
    this.location.go(path);

    const title = id
      ? this.selectedMember.name + this.pageSvc.postfix.replace('|', '| Team')
      : `Team${this.pageSvc.postfix}`;

    this.pageSvc.setPage({
      title,
      metaDesc: 'The team behind NG-MY 2019.',
      metaImg: `${environment.baseUrl}/assets/imgs/team/${id ? this.selectedMember.photo.normal : 'team-meta.jpg'}`,
      skipTitlePostfix: true
    });
  }

  unselectMember() {
    this.selectMember(null);
  }
}
