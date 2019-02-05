import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'my-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input()
  message: string;

  constructor() {}

  ngOnInit() {}
}
