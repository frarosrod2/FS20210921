import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'costumer-buttons',
  template: `
    <div class="costumer-buttons">
      <input type="submit" [disabled]="dis" (click)="send.emit(null)" value="Enviar">
      <button class="btn btn-danger" *ngIf="hasDelete" (click)="delete.emit(null)"><i class="far fa-trash-alt"> borrar</i></button>

    </div>`
})
export class FormCostumerButtons {

  @Input() dis: any;
  @Output() send: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  get hasDelete(): boolean { return this.delete.observers.length > 0; }

  constructor() {
  }



}
