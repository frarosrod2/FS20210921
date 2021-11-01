import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MyCoreModule, LoggerService, ERROR_LEVEL } from 'src/lib/my-core';
import { AjaxWaitInterceptor, MainModule } from './main';
import { CommonServicesModule } from './common-services';
import { SecurityModule } from './security';
import { environment } from 'src/environments/environment';
import { CommonComponentModule } from './common-component/common-component.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { CatalogoComponent, CatalogoModule } from './catalogo';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    AppRoutingModule, MyCoreModule, MainModule, CommonServicesModule, CommonComponentModule,
    SecurityModule, CatalogoModule
  ],
  providers: [LoggerService,
  {provide: ERROR_LEVEL, useValue: environment.ERROR_LEVEL}, { provide: LOCALE_ID, useValue: 'es-ES'},
  { provide: HTTP_INTERCEPTORS, useClass: AjaxWaitInterceptor, multi: true, },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
