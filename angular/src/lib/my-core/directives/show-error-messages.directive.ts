import {
  Directive,
  Input,
  HostBinding,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

@Directive({ selector: '[myShowErrors]' })
export class ShowErrorMessagesDirective implements OnChanges {
  @Input('myShowErrors') errors: any = undefined;
  @HostBinding('textContent') mensaje: string = '';
  @HostBinding('hidden') hidden: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    let message = '';
    if (this.errors) {
      for (let key of Object.keys(this.errors)) {
        switch (key) {
          case 'required':
            message = 'Campo requerido';
            break;
          case 'minlength':
            message = `El campo debe ser mayor a ${this.errors[key]['requiredLength']} caracteres`;
            break;
          case 'maxlength':
            message = `El campo debe ser menor a ${this.errors[key]['requiredLength']} caracteres`;
            break;
          case 'email':
            message = `Debe tener formato email`;
            break;
          case 'max':
            message = `El mayor número permitido es ${this.errors[key]['max']}`;
            break;
          case 'min':
            message = `El menor número permitido es ${this.errors[key]['min']}`;
            break;
          default:
            if (typeof this.errors[key] === 'string')
              message += `${this.errors[key]}${
                this.errors[key].endsWith('.') ? '' : '.'
              } `;
            else if (typeof this.errors[key]?.message === 'string')
              message += `${this.errors[key].message}${
                this.errors[key].message.endsWith('.') ? '' : '.'
              } `;
            break;
        }
      }
      this.mensaje = message;
      this.hidden = this.mensaje === '';
    } else {
      this.hidden = true;
      return;
    }
  }
}

export const DIRECTIVAS_MENS = [ShowErrorMessagesDirective];
