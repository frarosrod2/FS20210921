import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormButtonsComponent } from './form-buttons/form-buttons.component';
import { ShowErrorsMessagesComponent } from './show-errors-messages/show-errors-messages.component';



@NgModule({
  declarations: [
    FormButtonsComponent,
    ShowErrorsMessagesComponent,
  ],
  exports: [
    FormButtonsComponent,
    ShowErrorsMessagesComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class CommonComponentModule { }
