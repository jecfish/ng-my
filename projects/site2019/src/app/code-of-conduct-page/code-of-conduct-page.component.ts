import { Component, OnInit } from '@angular/core';
import { PageService } from '../services/page.service';

@Component({
  selector: 'my-code-of-conduct-page',
  templateUrl: './code-of-conduct-page.component.html',
  styleUrls: ['./code-of-conduct-page.component.scss']
})
export class CodeOfConductPageComponent implements OnInit {
  title = 'Code of Conduct';

  constructor(private pageSvc: PageService) { }

  ngOnInit() {
    this.pageSvc.setPage({ title: this.title, path: '/coc' });
  }
}
