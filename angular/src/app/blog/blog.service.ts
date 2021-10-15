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
export class BlogDAOService extends RESTDAOService<any, any> {
  constructor(http: HttpClient) {
    super(http, 'blog', { withCredentials: true, context: new HttpContext().set(AUTH_REQUIRED, true) });
  }
}

export class Blog {
  id: number = 0;
  titulo: string | null = null;
  texto: string | null = null;
  autor: string | null = null;
  fecha: string | null = null;
  megusta: number | null = null;
  fotourl: string | null = null;
}

@Injectable({
  providedIn: 'root'
})
export class BlogViewModelService {

  protected listURL = '';
  protected modo: ModoCRUD = 'list';
  protected listado: Array<any> = [];
  protected elemento: any = {};
  protected idOriginal: any = null;

  constructor(protected notify: NotificationService, protected out: LoggerService,
    protected dao: BlogDAOService, protected router: Router) { }

  public get Modo(): ModoCRUD {
    return this.modo;
  }
  public get Listado(): Array<any> {
    return this.listado;
  }
  public get Elemento(): any {
    return this.elemento;
  }

  public list(): void {
    this.dao.query().subscribe(
      (data) => {
        this.modo = 'list';
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
      data => {
        this.elemento = data;
        this.idOriginal = key;
        this.modo = 'edit';
      },
      err => this.notify.add(err.message)
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
    if (!window.confirm('¿Seguro?')) {
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
    this.router.navigateByUrl(this.listURL);
  }

  public send(): void {
    switch (this.modo) {
      case 'add':
        this.dao.add(this.elemento).subscribe(
          (data) => {
            this.cancel()
            this.notify.add('Entrada añadida correctamente', NotificationType.info)
          },
          (err) => {this.notify.add(err.error.toString())
          }
        );
        break;
      case 'edit':
        this.dao.change(this.idOriginal, this.elemento).subscribe(
          (data) => {
            this.cancel()
            this.notify.add('Entrada editada correctamente', NotificationType.info)
          },
          (err) => this.notify.add(err.message)
        );
        break;
      case 'view':
        break;
    }
  }
}


