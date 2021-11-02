import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoComponent, CATALOGOS_COMPONENTES } from './catalogo.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonComponentModule } from '../common-component';
import { MyCoreModule } from 'src/lib/my-core';
import { CommonServicesModule } from '../common-services';
import {PaginatorModule} from 'primeng/paginator';

@NgModule({
  declarations: [CATALOGOS_COMPONENTES],
  exports:[CatalogoComponent],
  imports: [
    CommonModule, FormsModule, RouterModule.forChild([]),
    MyCoreModule, CommonComponentModule, CommonServicesModule, PaginatorModule
  ]
})
export class CatalogoModule { }
