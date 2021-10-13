import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowErrorsMessagesComponent } from './show-errors-messages/show-errors-messages.component';
import { FormButtonsComponent } from '.';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  declarations: [
    FormButtonsComponent,
    ShowErrorsMessagesComponent,
    PaginationComponent
  ],
  exports: [FormButtonsComponent, ShowErrorsMessagesComponent, PaginationComponent],
  imports: [
    CommonModule
  ]
})
export class CommonComponentModule { }
