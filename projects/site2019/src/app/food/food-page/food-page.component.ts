import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page.service';
import {
  transition,
  trigger,
  query,
  animate,
  style
} from '@angular/animations';
import { environment } from 'projects/site2019/src/environments/environment';

@Component({
  selector: 'my-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss'],
  animations: [
    trigger('switchAnim', [
      transition('idle => switch', [
        query('.food-list', [
          animate(
            '0.2s cubic-bezier(0.19, 1, 0.22, 1)',
            style({
              opacity: 0,
              transform: 'translateY(10px) translateX(10px)'
            })
          )
        ])
      ]),
      transition('switch=> idle', [
        query('.food-list', [
          style({ opacity: 0, transform: 'translateY(10px) translateX(10px)' }),
          animate(
            '0.2s cubic-bezier(0.19, 1, 0.22, 1)',
            style({ opacity: 1, transform: 'none' })
          )
        ])
      ])
    ])
  ]
})
export class FoodPageComponent implements OnInit {
  title = 'Food Menu';

  day = 1;
  state = 'idle';

  constructor(private pageSvc: PageService) {}

  ngOnInit() {
    this.pageSvc.setPage({
      title: this.title,
      metaDesc:
        'NG-MY is not just about the Angular talks but also delicious Malaysian food!',
      metaImg: `${environment.baseUrl}/assets/imgs/food-menu.jpg`
    });
  }

  handleSwitch({ fromState, toState }) {
    const anim = `${fromState} => ${toState}`;

    switch (anim) {
      case 'idle => switch':
        this.day = this.day === 1 ? 2 : 1;
        return (this.state = 'idle');
    }
  }

  switchDay() {
    this.state = 'switch';
  }
}
