import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, forkJoin } from 'rxjs';
import { CatalogoViewModelService } from './catalogo.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './tmpl-anfitrion.component.html',
  providers: [CatalogoViewModelService],
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit, OnDestroy {

  constructor(protected vm: CatalogoViewModelService, protected route: ActivatedRoute) { }
  public get VM(): CatalogoViewModelService { return this.vm; }
  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    if (id) {
      if (this.route.snapshot.url.slice(-1)[0]?.path === 'edit') {
         
         const actors$ = this.vm.listActors();
         const cat$ = this.vm.listCategories();
         forkJoin([actors$, cat$]).subscribe(results => {
          // results[0] is our character
          // results[1] is our character homeworld
          this.vm.ListadoActores = results[0];
          this.vm.ListadoCategorias = results[1];
          this.vm.edit(+id);
        });
        // 
      } else {
        this.vm.view(+id);
      }
    } else if (this.route.snapshot.url.slice(-1)[0]?.path === 'add') {
      this.vm.add();
    } else {
      this.vm.load();
    }
  }

  ngOnDestroy(): void {
    this.vm.clear()
  }
}

@Component({
  selector: 'app-catalogo-list',
  templateUrl: './tmpl-list.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoListComponent implements OnInit, OnDestroy {
  constructor(protected vm: CatalogoViewModelService) { }
  public get VM(): CatalogoViewModelService { return this.vm; }
  ngOnInit(): void { }
  ngOnDestroy(): void { }
}


@Component({
  selector: 'app-catalogo-add',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoAddComponent implements OnInit {
  constructor(protected vm: CatalogoViewModelService) { }
  public get VM(): CatalogoViewModelService { return this.vm; }
  ngOnInit(): void { }
}

@Component({
  selector: 'app-catalogo-edit',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoEditComponent implements OnInit, OnDestroy {
  constructor(protected vm: CatalogoViewModelService) { }
  public get VM(): CatalogoViewModelService { return this.vm; }
  ngOnInit(): void { }
  ngOnDestroy(): void { }
}

@Component({
  selector: 'app-catalogo-view',
  templateUrl: './tmpl-view.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoViewComponent implements OnInit, OnDestroy {
  constructor(protected vm: CatalogoViewModelService) { }
  public get VM(): CatalogoViewModelService { return this.vm; }
  ngOnInit(): void { }
  ngOnDestroy(): void { }
}

export const CATALOGOS_COMPONENTES = [CatalogoComponent, CatalogoListComponent, CatalogoAddComponent,
CatalogoEditComponent, CatalogoViewComponent]
