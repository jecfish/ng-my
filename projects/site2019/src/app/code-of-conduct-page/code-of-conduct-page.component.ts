import { Component, OnInit } from '@angular/core';
import { PageService } from '../services/page.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'my-code-of-conduct-page',
  templateUrl: './code-of-conduct-page.component.html',
  styleUrls: ['./code-of-conduct-page.component.scss']
})
export class CodeOfConductPageComponent implements OnInit {
  title = 'Code of Conduct';

  constructor(private pageSvc: PageService) { }

  ngOnInit() {
    this.pageSvc.setPage({
      title: this.title,
      metaDesc: 'NG-MY is for the people. That\'s it. We want every single person to feel safe and welcome.'
    });
  }
}
