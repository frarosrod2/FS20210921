import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'errors-messages',
  templateUrl: './show-errors-messages.component.html',
  styleUrls: ['./show-errors-messages.component.scss']
})
export class ShowErrorsMessagesComponent implements OnInit {

  @Input() errors: any;

  object(){
   return JSON.stringify(this.errors);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
