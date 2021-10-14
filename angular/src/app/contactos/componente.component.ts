import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ContactosViewModelService } from './servicios.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './tmpl-anfitrion.component.html',
  styleUrls: ['./componente.component.scss'],
})
export class ContactosComponent implements OnInit {
  constructor(protected vm: ContactosViewModelService) {}
  public get VM(): ContactosViewModelService {
    return this.vm;
  }
  ngOnInit(): void {
    this.vm.list();
  }
}

@Component({
  selector: 'app-contactos-list',
  templateUrl: './tmpl-list.component.html',
  styleUrls: ['./componente.component.Scss'],
})
export class ContactosListComponent implements OnInit {
  constructor(protected vm: ContactosViewModelService) {}
  public get VM(): ContactosViewModelService {
    return this.vm;
  }
  ngOnInit(): void {
    this.vm.list();
  }
}
@Component({
  selector: 'app-contactos-add',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./componente.component.Scss'],
})
export class ContactosAddComponent implements OnInit {
  constructor(protected vm: ContactosViewModelService) {}
  public get VM(): ContactosViewModelService {
    return this.vm;
  }
  ngOnInit(): void {
    this.vm.add();
  }
}
@Component({
  selector: 'app-contactos-edit',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./componente.component.scss'],
})
export class ContactosEditComponent implements OnInit, OnDestroy {
  private obs$: any;
  constructor(
    protected vm: ContactosViewModelService,
    protected route: ActivatedRoute,
    protected router: Router
  ) {}
  public get VM(): ContactosViewModelService {
    return this.vm;
  }
  ngOnInit(): void {
    this.obs$ = this.route.paramMap.subscribe((params: ParamMap) => {
      const id = parseInt(params?.get('id') ?? '');
      if (id) {
        this.vm.edit(id);
      } else {
        this.router.navigate(['/404.html']);
      }
    });
  }
  ngOnDestroy(): void {
    this.obs$.unsubscribe();
  }
}
@Component({
  selector: 'app-contactos-view',
  templateUrl: './tmpl-view.component.html',
  styleUrls: ['./componente.component.scss'],
})
export class ContactosViewComponent implements OnInit, OnDestroy {
  private obs$: any;
  constructor(
    protected vm: ContactosViewModelService,
    protected route: ActivatedRoute,
    protected router: Router
  ) {}
  public get VM(): ContactosViewModelService {
    return this.vm;
  }
  ngOnInit(): void {
    this.obs$ = this.route.paramMap.subscribe((params: ParamMap) => {
      const id = parseInt(params?.get('id') ?? '');
      if (id) {
        this.vm.view(id);
      } else {
        this.router.navigate(['/404.html']);
      }
    });
  }
  ngOnDestroy(): void {
    this.obs$.unsubscribe();
  }
}
export const CONTACTOS_COMPONENTES = [
  ContactosComponent,
  ContactosListComponent,
  ContactosAddComponent,
  ContactosEditComponent,
  ContactosViewComponent,
];
