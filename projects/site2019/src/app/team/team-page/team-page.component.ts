import { Component, OnInit } from '@angular/core';
import team from '../../../assets/data/members.json';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../../services/page.service';
import { Location } from '@angular/common';
import { environment } from '../../../environments/environment';
import { IModal } from '../../shared/modal/modal.component.js';
import profileIcons from '../../../assets/data/profile-url-icons.json';

@Component({
  selector: 'my-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {
  members = team.members;
  organizers = team.organizers;
  selectedMemberId = null;

  profileIconsModel = profileIcons;

  get selectedMember() {
    return this.members.find(x => x.id === this.selectedMemberId) || this.organizers.find(x => x.id === this.selectedMemberId);
  }

  get selectedItem() {
    const member = this.selectedMember;

    if (!member) return null;

    const item: IModal = {
      thumbnails: [
        {
          url: `/team/${member.id}`,
          img: `../../assets/imgs/team/${member.photo}`,
          name: member.name,
          links: [member.profile].map(p => {
            return {
              url: p.url,
              type: this.profileIconsModel[p.type]
            };
          })
        }
      ],
      title: '',
      desc: member.description
    };
    return item;
  }

  constructor(
    private route: ActivatedRoute,
    private pageSvc: PageService,
    private location: Location
  ) { }

  ngOnInit() {
    const selectedMemberId = this.route.snapshot.paramMap.get('id');
    this.selectMember(selectedMemberId);
  }

  selectMember(id: string) {
    this.selectedMemberId = id;

    const path = id ? `/team/${id}` : '/team';
    this.location.go(path);

    const title = id
      ? this.selectMember.name + this.pageSvc.postfix.replace('|', '| Team')
      : `Team${this.pageSvc.postfix}`;

    this.pageSvc.setPage({
      title,
      metaDesc: 'The team behind NG-MY 2019.',
      metaImg: `${environment.baseUrl}/assets/imgs/team/${id ? this.selectedMember.photo : 'team-meta'}.jpg`,
      skipTitlePostfix: true
    });
  }

  unselectMember() {
    this.selectMember(null);
  }
}
