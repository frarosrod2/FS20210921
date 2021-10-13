import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemosComponent } from './demos/demos.component';
import { FormsModule } from '@angular/forms';
import { MyCoreModule, LoggerService, ERROR_LEVEL } from 'src/lib/my-core';
import { DinamicoComponent } from './dinamico/dinamico.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { MainModule } from './main';
import { CommonServicesModule } from './common-services';
import { SecurityModule } from './security';
import { environment } from 'src/environments/environment';
import { FormularioComponent } from './formulario/formulario.component';
import { ClienteFormularioComponent } from './cliente-formulario/cliente-formulario.component';
import { CommonComponentModule } from './common-component/common-component.module';
import {HttpClientModule} from '@angular/common/http'
import { ContactoModule } from './contactos';
import { NotificationComponent } from './main/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    DemosComponent,
    DinamicoComponent,
    CalculatorComponent,
    FormularioComponent,
    ClienteFormularioComponent, 
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    AppRoutingModule, MyCoreModule, MainModule, CommonServicesModule, CommonComponentModule,
    SecurityModule, ContactoModule
  ],
  providers: [LoggerService,
  {provide: ERROR_LEVEL, useValue: environment.ERROR_LEVEL}],
  bootstrap: [AppComponent]
})
export class AppModule { }
