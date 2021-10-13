import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MyCoreModule } from 'src/lib/my-core';
import { CommonServicesModule } from '../common-services';
import { CONTACTOS_COMPONENTES } from './componente.component';
import { NotificationComponent } from '../main/notification/notification.component';
import { AppModule } from '../app.module';
import { MainModule } from '../main';
import { CommonComponentModule } from '../common-component/common-component.module';

@NgModule({
  declarations: [
    CONTACTOS_COMPONENTES
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([]),
    MyCoreModule,
    CommonServicesModule, MainModule, CommonComponentModule
  ],
  exports: [CONTACTOS_COMPONENTES],
})
export class ContactoModule {}
