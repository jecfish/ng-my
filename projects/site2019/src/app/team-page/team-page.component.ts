import { Component, OnInit } from '@angular/core';
import { memberList } from './member.js';
import { Router, ActivatedRoute } from '@angular/router';

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
    return this.memberList[this.selectedMemberId];
  }

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.memberList = memberList;

    this.route.params.subscribe(({ id }) => {
      this.selectedMemberId = +id;
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
