import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client, ClienteFormularioComponent } from 'src/app/cliente-formulario/cliente-formulario.component';
import { NotificationService, NotificationType } from 'src/app/common-services';

@Component({
  selector: 'costumer-buttons',
  template: `
    <div>
      <button [disabled]="dis" (click)="send.emit(null)">Enviar</button>
      <input type="reset" value="Cancelar">
    </div>`
})
export class FormCostumerButtons {

  @Input() dis: any;
  @Output() send: EventEmitter<any> = new EventEmitter();


  constructor() {
  }



}
