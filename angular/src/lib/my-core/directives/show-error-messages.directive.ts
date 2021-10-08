import {
  Directive,
  Input,
  Output,
  HostListener,
  EventEmitter,
  HostBinding,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { ShowErrorsMessagesComponent } from 'src/app/common-component/show-errors-messages/show-errors-messages.component';
import { UppercaseValidator } from './validadores.directive';


export function test(errors: any): string {
  let message = ''
  if(errors !== null){
  for (let key of Object.keys(errors)) {
    switch (key) {
      case 'required':
        message = 'Campo requerido'
        break;
      case 'minlength':
        message = `El campo debe ser mayor a ${errors[key]["requiredLength"]} caracteres`
        break;
        case 'maxlength':
          message = `El campo debe ser menor a ${errors[key]["requiredLength"]} caracteres`
          break;
        case 'email':
          message = `Debe tener formato email`
          break;
        case 'max':
          message = `El mayor número permitido es ${errors[key]["max"]}`
          break;
      default:
        break;
    }
  }
}
  return message
}

@Directive({ selector: `[errors]`,
providers: [{ provide: NG_VALIDATORS, useExisting: ShowErrorMessagesDirective, multi: true }]
})
export class ShowErrorMessagesDirective implements Validator {
  @Input() errors: any;

validate(control: AbstractControl): ValidationErrors | null {
  return {name: test(this.errors)}
}

}


export const DIRECTIVAS_MENS = [ShowErrorMessagesDirective];
