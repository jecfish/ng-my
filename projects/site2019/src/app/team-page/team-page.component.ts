import { Component, OnInit } from '@angular/core';
import { memberList } from './member-list';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../services/page.service';
import { Meta } from '@angular/platform-browser';
import { Location } from '@angular/common';

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
  ) {}

  ngOnInit() {
    this.memberList = memberList;
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
      path,
      skipTitlePostfix: true
    });

    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({
      name: 'description',
      content: 'The team behind NG-MY 2019.'
    });
    this.meta.updateTag({ property: 'og:url', content: window.location.href });
  }

  unselectMember() {
    this.selectMember(null);
  }
}
