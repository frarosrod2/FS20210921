import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggerService } from 'src/lib/my-core';
import { RESTDAOService } from '../base-code/RESTDAOService';
import { ModoCRUD } from '../base-code/tipos';
import { NavigationService, NotificationService } from '../common-services';
import { AuthService, AUTH_REQUIRED } from '../security';

@Injectable({
  providedIn: 'root',
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
            if (page >= data.totalPages)
              page = data.totalPages > 0 ? data.totalPages - 1 : 0;
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
  protected languages: any = {};
  protected listadoActores: Array<any> = [];
  protected listadoCategorias: Array<any> = [];

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

  public get ListadoActores(): Array<any> {
    return this.listadoActores;
  }

  public get ListadoCategorias(): Array<any> {
    return this.listadoCategorias;
  }

  public set ListadoActores(actors: any) {
    this.listadoActores = actors;
  }

  public set ListadoCategorias(categories: any) {
    this.listadoCategorias = categories;
  }

  public get Languages(): any {
    return [
      {
        "languageId": 1,
        "name": "English",
      },
      {
        "languageId": 2,
        "name": "Italian",
      },
      {
        "languageId": 3,
        "name": "Japanese",
      },
      {
        "languageId": 4,
        "name": "Mandarin",
      },
      {
        "languageId": 5,
        "name": "French",
      },
      {
        "languageId": 6,
        "name": "German",
      }
    ]
  }


  public get isAutenticated() {
    return this.auth.isAutenticated;
  }

  get AuthorizationHeader() {
    return this.auth.AuthorizationHeader;
  }

  public list(): void {
    this.dao.query().subscribe(
      (data) => {
        this.listado = data;
        this.modo = 'list';
      },
      (err) => this.notify.add(err.message)
    );
  }

  public listActors(): Observable<any[]> {
     return this.http.get<Array<any>>( environment.apiURL+ 'actores')
    // .subscribe(
    //   (data) => {
    //     this.listadoActores = data;
    //    this.edit(key)
    //   },
    //   (err) => this.notify.add(err.message)
    // );
  }

  public listCategories(): Observable<any[]> {
    return this.http.get<Array<any>>( environment.apiURL+ 'categorias')
    // .subscribe(
    //   (data) => {
    //     this.listadoCategorias = data;
    //   },
    //   (err) => this.notify.add(err.message)
    // );
  }

  public add(): void {
    this.elemento = {};
    this.modo = 'add';
  }

  getIdsActors(): Array<number> {
    var listIds = [];
    for (let index = 0; index < this.elemento.actors.length; index++) {
      const actor = this.elemento.actors[index];
      const firstName = actor.split(' ')[0];
      const lastName = actor.split(' ')[1];
      const find = this.listadoActores.find(obj => {
        return obj.firstName === firstName && obj.lastName === lastName
      });
      if(find!==undefined && find.actorId!==undefined) listIds.push(find.actorId);
    }
    return listIds;
  }

  getIdsCategories(): Array<number> {
    var listIds = [];
    for (let index = 0; index < this.elemento.categories.length; index++) {
      const name = this.elemento.categories[index];
      const find = this.listadoCategorias.find(obj => {
        return obj.name === name;
      });
      if(find!==undefined && find.categoryId!==undefined) listIds.push(find.categoryId);
    }
    return listIds;
  }

  public edit(key: any): void {
    this.dao.get(key).subscribe(
      (data) => {
        this.elemento = data;
        this.elemento.actors = this.getIdsActors();
        this.elemento.categories = this.getIdsCategories();
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
    if (!window.confirm('¿Seguro?')) {
      return;
    }

    this.dao
      .remove(key, { headers: { Authorization: this.AuthorizationHeader } })
      .subscribe(
        (data) => this.load(),
        (err) => this.notify.add(err.message)
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
        this.elemento.language = this.getLangId(this.elemento.language)
        this.elemento.languageVO = this.getLangId(this.elemento.languageVO)
        this.dao.add(this.elemento, { headers: { Authorization: this.AuthorizationHeader } }).subscribe(
          (data) => this.cancel(),
          (err) => this.notify.add(err.message)
        );
        break;
      case 'edit':
        this.elemento.language = this.getLangId(this.elemento.language)
        this.elemento.languageVO = this.getLangId(this.elemento.languageVO)
        this.dao.change(this.idOriginal, this.elemento, { headers: { Authorization: this.AuthorizationHeader } }).subscribe(
          (data) => this.cancel(),
          (err) => this.notify.add(err.message)
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
    if (page < 0) page = this.page;
    this.dao.page(page, this.rowsPerPage).subscribe(
      (rslt) => {
        this.page = rslt.page;
        this.totalPages = rslt.pages;
        this.totalRows = rslt.rows;
        this.listado = rslt.list;
        this.modo = 'list';
      },
      (err) => this.notify.add(err.message)
    );
  }

  public getLangId(lang: string): number | any {
    switch (lang) {
      case 'English':
        return 1;
      case 'Italian':
        return 2;
      case 'Japanese':
        return 3;
      case 'Mandarian':
        return 4;
      case 'French':
        return 5;
      case 'German':
        return 6;
      default:
        return null;
    }
  }
}
