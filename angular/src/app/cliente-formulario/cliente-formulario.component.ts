import { Component, Injectable, OnInit } from '@angular/core';
import { NotificationService, NotificationType } from '../common-services';

export interface Client {
  name: string;
  surname: string;
  email: string;
  birth: string;
  gender: string;
  address: string | null;
  city: string | null;
  country: string;
  postal: string | null;
  iban: string;
}

@Injectable({ providedIn: 'root' })
export class CostumerViewModel {
  constructor(private notify: NotificationService) {}
  Listado: Array<Client> = [];

  Elemento: Client = {
    name: '',
    surname: '',
    email: '',
    birth: '',
    gender: '',
    address: null,
    city: null,
    country: '',
    postal: null,
    iban: '',
  };

  public send() {
    this.notify.add(
      'Datos enviados:' + JSON.stringify(this.Elemento),
      NotificationType.info
    );
  }
}

@Component({
  selector: 'app-cliente-formulario',
  templateUrl: './cliente-formulario.component.html',
  styleUrls: ['./cliente-formulario.component.scss'],
})
export class ClienteFormularioComponent implements OnInit {
  test: any = {};

  constructor(public vm: CostumerViewModel) {}

  olddate: any;
  newdate: any;
  ngOnInit(): void {
    this.olddate = new Date('1900-01-01').toISOString().slice(0, 10);
    this.newdate = new Date('2005-01-01').toISOString().slice(0, 10);
  }
}
