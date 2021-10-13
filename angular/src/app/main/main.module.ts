import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AjaxWaitComponent } from './ajax-wait';
import { CommonServicesModule, NotificationType } from '../common-services';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    HomeComponent,
    AjaxWaitComponent, NotificationComponent
  ],
  exports: [
    HomeComponent,
    AjaxWaitComponent, NotificationComponent
  ],
  imports: [
    CommonModule, CommonServicesModule
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
