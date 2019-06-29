import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'my-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss']
})
export class FoodPageComponent implements OnInit {
  title = 'Food Menu';

  day = 1;

  constructor(private pageSvc: PageService) {}

  ngOnInit() {
    this.pageSvc.setPage({
      title: this.title,
      metaDesc: 'NG-MY is about the conference and also food!'
    });
  }

  selectDay(day) {
    this.day = day;
  }
}
