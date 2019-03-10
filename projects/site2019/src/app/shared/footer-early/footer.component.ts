import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page.service';

// @Component({
//   selector: 'my-footer',
//   templateUrl: './footer.component.html',
//   styleUrls: ['./footer.component.scss']
// })
export class FooterComponent implements OnInit {
  socialMediaList = [];

  constructor(private pageSvc: PageService) {}

  ngOnInit() {
    this.socialMediaList = this.pageSvc.getSocialMediaList();
  }
}
