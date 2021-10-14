import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AjaxWaitComponent } from './ajax-wait';
import { CommonServicesModule, NotificationType } from '../common-services';
import { NotificationComponent } from './notification/notification.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { SecurityModule } from '../security';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    AjaxWaitComponent, NotificationComponent, PageNotFoundComponent, HeaderComponent
  ],
  exports: [
    HomeComponent,
    AjaxWaitComponent, NotificationComponent, PageNotFoundComponent, HeaderComponent
  ],
  imports: [
    CommonModule, CommonServicesModule, SecurityModule, RouterModule.forChild([])
  ],
})
export class MainModule {
  constructor( @Optional() @SkipSelf() parentModule: MainModule) {
    if (parentModule) {
      const msg = `MainModule has already been loaded.
        Import MainModule once, only, in the root AppModule.`;
      throw new Error(msg);
    }
  }
}
