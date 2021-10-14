import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'errors-messages',
  templateUrl: './show-errors-messages.component.html',
  styleUrls: ['./show-errors-messages.component.scss'],
})
export class ShowErrorsMessagesComponent implements OnInit {
  @Input() errors: any;
  required: boolean = false;
  minlength: string = '';

  list:string[] = []

  ngOnchanges(changes: SimpleChanges): void {
    if(this.errors !== null){
    for (let key of Object.keys(this.errors)) {
      switch (key) {
        case 'required':
          this.list.push('Campo requerido')
          break;
        case 'minlength':
          this.list.push(`El campo debe ser mayor a ${this.errors[key]["requiredLength"]} caracteres`)
          break;
          case 'maxlength':
            this.list.push(`El campo debe ser menor a ${this.errors[key]["requiredLength"]} caracteres`)
            break;
          case 'email':
            this.list.push(`Debe tener formato email`)
            break;
          case 'max':
            this.list.push(`El mayor número permitido es ${this.errors[key]["max"]}`)
            break;
          case 'iban':
            this.list.push('Iban incorrecto')
            break;
        default:
          break;
      }
    }
  }
  this.list = []
}

  constructor() {}

  ngOnInit(): void {}
}
