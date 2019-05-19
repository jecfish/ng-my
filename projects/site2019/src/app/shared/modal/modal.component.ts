import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  stagger,
  style,
  transition,
  animate,
  keyframes,
  animateChild,
  query,
  group
} from '@angular/animations';

@Component({
  selector: 'my-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modalAnim', [
      transition('void => show', [
        group([
          query('@closeBtnAnim', animateChild()),
          animate(
            '0.2s cubic-bezier(0.215, 0.61, 0.355, 1)',
            keyframes([
              style({
                transform: 'translateX(150px)',
                opacity: '0',
                'box-shadow': '8px 0 #232323'
              }),
              style({
                transform: 'translateX(0)',
                opacity: '1',
                'box-shadow': '8px 8px #232323'
              })
            ])
          )
        ])
      ]),
      transition('show => hide', [
        group([
          query('@closeBtnAnim', animateChild()),
          animate(
            '0.2s 0.05s cubic-bezier(0.19, 1, 0.22, 1)',
            style({ transform: 'translateX(150px)', opacity: 0 })
          )
        ])
      ])
    ]),
    trigger('closeBtnAnim', [
      transition('void => show', [
        animate(
          '0.1s 0.1s ease',
          keyframes([
            style({ transform: 'rotate(0deg)' }),
            style({ transform: 'rotate(45deg)' })
          ])
        )
      ]),
      transition('show => hide', [
        animate('0.1s ease', keyframes([style({ transform: 'rotate(0deg)' })]))
      ])
    ])
  ]
})
export class ModalComponent {
  @Input()
  item: IModal;

  @Output()
  unselect = new EventEmitter();

  private hide = 0;

  get modalAnimState() {
    const hideStateModel = ['show', 'hide'];
    return hideStateModel[this.hide];
  }

  constructor() {}

  handleAnimDone({ fromState, toState }) {
    const animTransition = `${fromState} => ${toState}`;
    switch (animTransition) {
      case 'show => hide':
        return this.unselect.emit();
    }
  }

  hideModal() {
    this.hide = 1;
  }
}

export interface IModal {
  thumbnails: {
    url: string;
    img: string;
    name: string;
    links: {
      url: string;
      type: string;
    }[];
  }[];
  title?: string;
  desc: string;
}
