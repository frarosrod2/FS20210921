import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogoViewModelService } from './catalogo.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
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
        this.vm.edit(+id);
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


export const
CATALOGOS_COMPONENTES = [CatalogoComponent]
