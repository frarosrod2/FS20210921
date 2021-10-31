import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoComponent } from '.';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonComponentModule } from '../common-component';
import { MyCoreModule } from 'src/lib/my-core';
import { CommonServicesModule } from '../common-services';



@NgModule({
  declarations: [CatalogoComponent],
  exports:[CatalogoComponent],
  imports: [
    CommonModule, FormsModule, RouterModule.forChild([]),
    MyCoreModule, CommonComponentModule, MyCoreModule, CommonServicesModule
  ]
})
export class CatalogoModule { }
