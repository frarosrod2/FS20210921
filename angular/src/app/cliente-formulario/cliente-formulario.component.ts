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
}


@Injectable({ providedIn: 'root' })
export class CostumerViewModel {

  constructor(private notify: NotificationService) {
  }
  Listado: Array<Client> = []

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
  };

  public send() {
    this.notify.add('Datos enviados:' +
        JSON.stringify(this.Elemento),
      NotificationType.info
    );
  }
}

@Component({
  selector: 'app-cliente-formulario',
  templateUrl: './cliente-formulario.component.html',
  styleUrls: ['./cliente-formulario.component.scss']
})
export class ClienteFormularioComponent implements OnInit {

  constructor(public vm: CostumerViewModel) { }

  ngOnInit(): void {
  }

}
