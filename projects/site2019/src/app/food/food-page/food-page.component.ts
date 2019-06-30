import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page.service';
import { environment } from 'projects/site2019/src/environments/environment';

@Component({
  selector: 'my-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss']
})
export class FoodPageComponent implements OnInit {
  title = 'Food Menu';

  constructor(private pageSvc: PageService) { }

  ngOnInit() {
    this.pageSvc.setPage({
      title: this.title,
      metaDesc: 'NG-MY is about the conference and also food!',
      metaImg: `${environment.baseUrl}/assets/imgs/food-menu.jpg`
    });
  }
}
