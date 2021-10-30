import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/common-services';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(private vm: NotificationService) { }

  public get VM() { return this.vm; }

  ngOnInit(): void {
  }

}
