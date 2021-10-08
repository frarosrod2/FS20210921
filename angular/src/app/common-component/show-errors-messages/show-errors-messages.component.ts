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
    let list = []
    if(this.errors !== null){
    for (let key of Object.keys(this.errors)) {
      console.log(key)
      switch (key) {
        case 'required':
          list.push('Campo requerido')
          break;
        case 'minlength':
          list.push(`El campo debe ser mayor a ${this.errors[key]["requiredLength"]} caracteres`)
          break;
          case 'maxlength':
            list.push(`El campo debe ser menor a ${this.errors[key]["requiredLength"]} caracteres`)
            break;
          case 'email':
            list.push(`Debe tener formato email`)
            break;
          case 'max':
            list.push(`El mayor número permitido es ${this.errors[key]["max"]}`)
            break;
        default:
          break;
      }
    }
    return list
  }
  return []
}

  init(value: any){

  }

  json() {
    return JSON.stringify(this.errors);
  }

  constructor() {}

  ngOnInit(): void {}
}
