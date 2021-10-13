import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowErrorsMessagesComponent } from './show-errors-messages/show-errors-messages.component';
import { FormButtonsComponent } from '.';



@NgModule({
  declarations: [
    FormButtonsComponent,
    ShowErrorsMessagesComponent
  ],
  exports: [FormButtonsComponent, ShowErrorsMessagesComponent],
  imports: [
    CommonModule
  ]
})
export class CommonComponentModule { }
