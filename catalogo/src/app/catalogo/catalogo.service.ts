import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggerService } from 'src/lib/my-core';
import { RESTDAOService } from '../base-code/RESTDAOService';
import { ModoCRUD } from '../base-code/tipos';
import { NavigationService, NotificationService } from '../common-services';
import { AuthService, AUTH_REQUIRED } from '../security';

@Injectable({
  providedIn: 'root'
})
export class CatalogoDAOService extends RESTDAOService<any, any> {
  constructor(http: HttpClient) {
    super(http, 'peliculas', {
      context: new HttpContext().set(AUTH_REQUIRED, true),
    });
  }
  page(
    page: number,
    rows: number = 20
  ): Observable<{
    page: number;
    pages: number;
    rows: number;
    list: Array<any>;
  }> {
    return new Observable((subscriber) => {
      this.http
        .get<{ totalPages: number; size: number }>(
          `${this.baseUrl}?page=count&size=${rows}`,
          this.option
        )
        .subscribe(
          (data) => {
            if (page >= data.totalPages) page = data.totalPages > 0 ? data.totalPages - 1 : 0;
            this.http
              .get<any>(
                `${this.baseUrl}?page=${page}&size=${rows}&sort=filmId,DESC`,
                this.option
              )
              .subscribe(
                (lst) =>
                  subscriber.next({
                    page,
                    pages: data.totalPages,
                    rows: data.size,
                    list: lst.content,
                  }),
                (err) => subscriber.error(err)
              );
          },
          (err) => subscriber.error(err)
        );
    });
  }
}

@Injectable({
  providedIn: 'root',
})
export class CatalogoViewModelService {
  protected modo: ModoCRUD = 'list';
  protected listado: Array<any> = [];
  protected elemento: any = {};
  protected idOriginal: any = null;
  protected listURL = '/';

  constructor(
    private http: HttpClient,
    protected notify: NotificationService,
    protected out: LoggerService,
    private navigation: NavigationService,
    protected dao: CatalogoDAOService,
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

  get AuthorizationHeader() { return this.auth.AuthorizationHeader;  }


  public list(): void {
    this.dao.query().subscribe(
      (data) => {
        this.listado = data;
        this.modo = 'list';
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
    if (!window.confirm('¿Seguro?')) { return; }

    this.dao.remove(key, {headers: {'Authorization': this.AuthorizationHeader}}).subscribe(
      data => this.load(),
      err => this.notify.add(err.message)
    );
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
          data => this.cancel(),
          err => this.notify.add(err.message)
        );
        break;
      case 'edit':
        this.dao.change(this.idOriginal, this.elemento).subscribe(
          data => this.cancel(),
          err => this.notify.add(err.message)
        );
        break;
      case 'view':
        this.cancel();
        break;
    }
  }

  clear() {
    this.elemento = {};
    this.idOriginal = null;
    this.listado = [];
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
