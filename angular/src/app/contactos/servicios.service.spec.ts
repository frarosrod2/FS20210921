import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { LoggerService } from 'src/lib/my-core';
import { NotificationService } from '../common-services';

import { Contactos, ContactosViewModelService } from './servicios.service';

export class DAOServiceMock<T, K> {
  constructor(private listado: Array<T>) {}
  query(): Observable<Array<T>> {
    return of(this.listado);
  }
  get(id: number): Observable<T> {
    return of(this.listado[0]);
  }
  add(item: any): Observable<T> {
    return of(item);
  }
  change(id: number, item: any): Observable<T> {
    return of(item);
  }
  remove(id: number): Observable<T> {
    let item = this.listado[id];
    this.listado.slice(id, 1);
    return of(item);
  }
}

class ContactosDAOService extends DAOServiceMock<Contactos, number> {
  constructor() {
    super([
      {
        "id": 1,
        "tratamiento": "Sra.",
        "nombre": "Marline",
        "apellidos": "Lockton Jerrans",
        "telefono": "846 054 444",
        "email": "mjerrans0@de.vu",
        "sexo": "M",
        "nacimiento": "1973-07-09",
        "avatar": "https://randomuser.me/api/portraits/women/1.jpg",
        "conflictivo": true
      },
      {
        "id": 2,
        "tratamiento": "Sr.",
        "nombre": "Beale",
        "apellidos": "Knibb Koppe",
        "telefono": "093 804 977",
        "email": "bkoppe0@apache.org",
        "sexo": "H",
        "nacimiento": "1995-11-22",
        "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
        "conflictivo": false
      },
      {
        "id": 3,
        "tratamiento": "Srta.",
        "nombre": "Gwenora",
        "apellidos": "Forrestor Fitzackerley",
        "telefono": "853 134 343",
        "email": "gfitzackerley1@opensource.org",
        "sexo": "M",
        "nacimiento": "1968-06-12",
        "avatar": "https://randomuser.me/api/portraits/women/2.jpg",
        "conflictivo": false
      },
      {
        "id": 4,
        "tratamiento": "Sr.",
        "nombre": "Umberto",
        "apellidos": "Langforth Spenclay",
        "telefono": "855 032 596",
        "email": "uspenclay1@mlb.com",
        "sexo": "H",
        "nacimiento": "2000-05-15",
        "avatar": "https://randomuser.me/api/portraits/men/2.jpg",
        "conflictivo": false
      },
    ])
  }
}

describe('ContactosViewModelService', () => {
  let service: ContactosViewModelService;
  let dao: ContactosDAOService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [NotificationService, LoggerService, { provide: ContactosDAOService, useClass: ContactosDAOService }],
    });
    service = TestBed.inject(ContactosViewModelService);
    dao = TestBed.inject(ContactosDAOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('list', fakeAsync(() => {
    service.list()
    tick()
    expect(service.Listado.length).toBe(4)
    expect(service.Modo).toBe('list')
  }))

});
