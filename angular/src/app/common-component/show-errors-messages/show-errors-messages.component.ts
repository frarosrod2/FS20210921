import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'errors-messages',
  templateUrl: './show-errors-messages.component.html',
  styleUrls: ['./show-errors-messages.component.scss'],
})
export class ShowErrorsMessagesComponent implements OnInit {
  @Input() errors: any;
  required: boolean = false;
  minlength: string = '';

  object() {
    if(this.errors !== null){
    for (let key of Object.keys(this.errors)) {
      console.log(key)
      switch (key) {
        case 'required':
          return 'Campo requerido'
        case 'minlength':
          return `El campo debe ser mayor a ${this.errors[key]["requiredLength"]} caracteres`
          case 'maxlength':
            return `El campo debe ser menor a ${this.errors[key]["requiredLength"]} caracteres`
        default:
          return '';
      }
    }
  }
  return ''
}

  init(value: any){

  }

  json() {
    return JSON.stringify(this.errors);
  }

  constructor() {}

  ngOnInit(): void {}
}
