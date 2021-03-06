import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from 'src/lib/my-core';
import { RESTDAOService } from '../base-code/RESTDAOService';
import { NotificationService, NotificationType } from '../common-services';
import { AUTH_REQUIRED } from '../security';

export type ModoCRUD = 'list' | 'add' | 'edit' | 'view' | 'delete';

@Injectable({
  providedIn: 'root',
})
export class ContactosDAOService extends RESTDAOService<any, any> {
  constructor(http: HttpClient) {
    super(http, 'contactos', { withCredentials: true, context: new HttpContext().set(AUTH_REQUIRED, true) });
  }
}

export class Contactos {
  id: number = 0;
  tratamiento: string | null = null;
  nombre: string | null = null;
  apellidos: string | null = null;
  telefono: string | null = null;
  email: string | null = null;
  sexo: string | null = null;
  nacimiento: string | null = null;
  avatar: string | null = null;
  conflictivo: boolean = false;
}

@Injectable({
  providedIn: 'root',
})
export class ContactosViewModelService {

  protected listURL = '/contactos';
  protected modo: ModoCRUD = 'list';
  protected listado: Array<any> = [];
  protected datos: Array<any> = [];
  protected elemento: any = {};
  protected idOriginal: any = null;
  protected itemsPerPage: number = 10;
  protected allPages: number =100;

  constructor(protected notify: NotificationService, protected out: LoggerService,
    protected dao: ContactosDAOService, protected router: Router) { }
  public get Modo(): ModoCRUD {
    return this.modo;
  }
  public get Listado(): Array<any> {
    return this.listado;
  }

  public get Datos(): Array<any> {
    return this.listado;
  }

  public get Elemento(): any {
    return this.elemento;
  }

  public get ItemsPerPage(): any {
    return this.itemsPerPage;
  }

  public get AllPages(): any {
    return this.allPages;
  }

  public list(): void {
    this.dao.query().subscribe(
      (data) => {
        this.datos = data;
        this.modo = 'list';
        // this.allPages = Math.ceil(data.length / this.itemsPerPage);
        // this.listado = this.datos.slice(0, this.itemsPerPage);
        this.listado = data
      },
      (err) => this.notify.add(err.message)
    );
  }

  public add(): void {
    this.elemento = {};
    this.modo = 'add';
  }
  public edit(key: any): void {
    this.dao.get(key).subscribe(
      (data) => {
        this.elemento = data;
        this.idOriginal = key;
        this.modo = 'edit';
      },
      (err) => this.notify.add(err.message)
    );
  }
  public view(key: any): void {
    this.dao.get(key).subscribe(
      (data) => {
        this.elemento = data;
        this.modo = 'view';
      },
      (err) => this.notify.add(err.message)
    );
  }
  public delete(key: any): void {
    if (!window.confirm('??Seguro?')) {
      return;
    }

    this.dao.remove(key).subscribe(
      (data) => this.list(),
      (err) => this.notify.add(err.message)
    );
  }

  clear() {
    this.elemento = {};
    this.idOriginal = null;
    this.listado = [];
  }

  public cancel(): void {
    this.elemento = {};
    this.idOriginal = null;
    // this.list();
    this.router.navigateByUrl(this.listURL);
  }

  public onPageChange(page: number = 1): void {
    const startItem = (page - 1) * this.itemsPerPage;
    const endItem = page * this.itemsPerPage;
    this.listado = this.datos.slice(startItem, endItem);
  }

  public send(): void {
    switch (this.modo) {
      case 'add':
        this.dao.add(this.elemento).subscribe(
          (data) => {
            this.cancel()
            this.notify.add('Contacto a??adido correctamente', NotificationType.info)
          },
          (err) => {this.notify.add(err.error.toString())
          }
        );
        break;
      case 'edit':
        this.dao.change(this.idOriginal, this.elemento).subscribe(
          (data) => {
            this.cancel()
            this.notify.add('Contacto editado correctamente', NotificationType.info)
          },
          (err) => this.notify.add(err.message)
        );
        break;
      case 'view':
        break;
    }
  }
}
