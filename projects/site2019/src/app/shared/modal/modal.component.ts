import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'my-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input()
  item: IModal;

  @Output()
  unselect = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  unselectItem() {
    this.unselect.emit();
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
    }[]
  }[];
  title?: string;
  desc: string;
}
