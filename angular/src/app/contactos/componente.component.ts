import { Component, OnDestroy, OnInit } from '@angular/core';
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
  styleUrls: ['./componente.component.scss'],
})
export class ContactosListComponent implements OnInit {
  constructor(protected vm: ContactosViewModelService) {}
  public get VM(): ContactosViewModelService {
    return this.vm;
  }
  ngOnInit(): void {}
}
@Component({
  selector: 'app-contactos-add',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./componente.component.scss'],
})
export class ContactosAddComponent implements OnInit {
  constructor(protected vm: ContactosViewModelService) {}
  public get VM(): ContactosViewModelService {
    return this.vm;
  }
  ngOnInit(): void {}
}
@Component({
  selector: 'app-contactos-edit',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./componente.component.scss'],
})
export class ContactosEditComponent implements OnInit, OnDestroy {
  constructor(protected vm: ContactosViewModelService) {}
  public get VM(): ContactosViewModelService {
    return this.vm;
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
@Component({
  selector: 'app-contactos-view',
  templateUrl: './tmpl-view.component.html',
  styleUrls: ['./componente.component.scss'],
})
export class ContactosViewComponent implements OnInit, OnDestroy {
  constructor(protected vm: ContactosViewModelService) {}
  public get VM(): ContactosViewModelService {
    return this.vm;
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {}
}

export const CONTACTOS_COMPONENTES = [
  ContactosComponent, ContactosListComponent, ContactosAddComponent,
  ContactosEditComponent, ContactosViewComponent,
];
