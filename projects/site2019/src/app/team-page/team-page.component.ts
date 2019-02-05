import { Component, OnInit } from '@angular/core';
import { memberList } from './member-list';
import { Router, ActivatedRoute } from '@angular/router';
import { PageService } from '../services/page.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'my-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {
  memberList = [];

  selectedMemberId = null;

  profileIconsModel = {
    website: 'fas fa-globe-asia',
    linkedin: 'fab fa-linkedin',
    facebook: 'fab fa-facebook',
    twitter: 'fab fa-twitter'
  };

  get selectedMember() {
    return this.memberList.find(x => x.id === this.selectedMemberId);
  }

  constructor(private router: Router, private route: ActivatedRoute, private meta: Meta, private pageSvc: PageService) { }

  ngOnInit() {
    this.memberList = memberList;

    this.route.params.subscribe(({ id }) => {
      this.selectedMemberId = id;

      const title = id ? this.selectedMember.name + this.pageSvc.postfix.replace('|', '| Team') : `Team${this.pageSvc.postfix}`;
      this.pageSvc.setPage({
        title,
        path: id ? `/team/${id}` : '/team',
        skipTitlePostfix: true
      });

      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ name: 'description', content: 'The team behind NG-MY 2019.' });
      this.meta.updateTag({ property: 'og:url', content: window.location.href });
    });
  }

  selectMember(id) {
    this.router.navigate(['/team', id]);
  }

  unselectMember() {
    this.router.navigate(['/team']);
  }

  onProfileClick(e) {
    e.stopPropgation();
  }
}
