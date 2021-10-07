import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { NotificationService, NotificationType } from '../common-services';

export interface Persona {
  id: number | null;
  nombre: string;
  apellidos: string;
  correo: string | null;
  edad: number | null;
  dni: string | null;
}

@Injectable({ providedIn: 'root' })
export class ClientsViewModel {
  Listado: Array<Persona> = [
    {
      id: null,
      nombre: 'Pepito',
      apellidos: 'Pérez',
      correo: 'pepito@gmail.com',
      edad: 99,
      dni: '12345678Z',
    },
  ];
  Elemento: Persona = {
    id: null,
    nombre: '',
    apellidos: '',
    correo: null,
    edad: null,
    dni: null,
  };
  isAdd = true;

  constructor(private notify: NotificationService) {
    this.add();
  }

  public list() {}

  public add() {
    this.Elemento = {
      id: null,
      nombre: '',
      apellidos: '',
      correo: null,
      edad: null,
      dni: null,
    };
    this.isAdd = true;
  }

  public edit() {
    this.Elemento = this.Listado[0];
    this.isAdd = false;
  }

  public view() {
    this.Elemento = this.Listado[0];
    this.isAdd = false;
  }

  public delete() {}

  public cancel() {}

  public send() {
    this.notify.add(
      (this.isAdd ? 'Nuevos: ' : 'Modificados: ') +
        JSON.stringify(this.Elemento),
      NotificationType.info
    );
  }
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  constructor(public vm: ClientsViewModel) {}

  ngOnInit(): void {}
}
