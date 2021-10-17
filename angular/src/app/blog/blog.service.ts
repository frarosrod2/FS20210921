import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggerService } from 'src/lib/my-core';
import { RESTDAOService } from '../base-code/RESTDAOService';
import { NotificationService, NotificationType } from '../common-services';
import { AuthService, AUTH_REQUIRED } from '../security';

export type ModoCRUD = 'list' | 'add' | 'edit' | 'view' | 'delete';

@Injectable({
  providedIn: 'root',
})
export class BlogDAOService extends RESTDAOService<any, any> {
  constructor(http: HttpClient) {
    super(http, 'blog', {
      withCredentials: true,
      context: new HttpContext().set(AUTH_REQUIRED, true),
    });
  }
  page(page: number, rows: number = 20): Observable<{ page: number, pages: number, rows: number, list: Array<any> }> {
    return new Observable(subscriber => {
      this.http.get<{ pages: number, rows: number }>(`${this.baseUrl}?_page=count&_rows=${rows}`, this.option)
        .subscribe(
          data => {
            if (page >= data.pages) page = data.pages > 0 ? data.pages - 1 : 0;
            this.http.get<Array<any>>(`${this.baseUrl}?_page=${page}&_rows=${rows}&_sort=nombre`, this.option)
              .subscribe(
                lst => subscriber.next({ page, pages: data.pages, rows: data.rows, list: lst }),
                err => subscriber.error(err)
              )
          },
          err => subscriber.error(err)
        )
    })
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
  providedIn: 'root',
})
export class BlogViewModelService {
  protected listURL = '/';
  protected modo: ModoCRUD = 'list';
  protected listado: Array<any> = [];
  protected elemento: any = {};
  protected idOriginal: any = null;

  constructor(
    protected notify: NotificationService,
    protected out: LoggerService,
    protected dao: BlogDAOService,
    protected router: Router,
    protected auth: AuthService
  ) {}

  public get Modo(): ModoCRUD {
    return this.modo;
  }
  public get Listado(): Array<any> {
    return this.listado;
  }
  public get Elemento(): any {
    return this.elemento;
  }

  public get isAutenticated() {
    return this.auth.isAutenticated;
  }

  get Name() {
    return this.auth.Name;
  }

  public list(): void {
    this.dao.query().subscribe(
      (data) => {
        this.modo = 'list';
        this.listado = data;
      },
      (err) => this.notify.add(err.message)
    );
  }

  public add(): void {
    if (this.auth.isAutenticated) {
      this.elemento = {};
      this.modo = 'add';
    } else {
      this.router.navigate(['']);
    }
  }

  public edit(key: any): void {
    if (this.auth.isAutenticated) {
    this.dao.get(key).subscribe(
      (data) => {
        this.elemento = data;
        this.idOriginal = key;
        this.modo = 'edit';
      },
      (err) => this.notify.add(err.message)
    );}else{
      this.router.navigate(['']);
    }
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
    if (this.auth.isAutenticated) {
    if (!window.confirm('¿Seguro?')) {
      return;
    }

    this.dao.remove(key).subscribe(
      (data) => this.list(),
      (err) => this.notify.add(err.message)
    );}else{
      this.router.navigate(['']);
    }

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
        let date = new Date();
        const offset = date.getTimezoneOffset();
        date = new Date(date.getTime() - offset * 60 * 1000);
        this.elemento.fecha = date.toISOString().split('T')[0];
        if(this.elemento.autor == undefined) this.elemento.autor = this.Name
        this.dao.add(this.elemento).subscribe(
          (data) => {
            this.cancel();
            this.notify.add(
              'Entrada añadida correctamente',
              NotificationType.info
            );
          },
          (err) => {
            this.notify.add(err.error.toString());
          }
        );
        break;
      case 'edit':
       this.dao.change(this.idOriginal, this.elemento).subscribe(
          data => this.cancel(),
          err => this.notify.add(err.message)
        );
        break;
      case 'view':
        break;
    }
  }
  page = 0;
  totalPages = 0;
  totalRows = 0;
  rowsPerPage = 8;
  load(page: number = -1) {
    if(page < 0) page = this.page
    this.dao.page(page, this.rowsPerPage).subscribe(
      rslt => {
        this.page = rslt.page;
        this.totalPages = rslt.pages;
        this.totalRows = rslt.rows;
        this.listado = rslt.list;
        this.modo = 'list';
      },
      err => this.notify.add(err.message)
    )
  }
}
