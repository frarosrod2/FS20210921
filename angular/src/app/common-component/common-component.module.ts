import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCostumerButtons } from './form-buttons/form-buttons.component';
import { ShowErrorsMessagesComponent } from './show-errors-messages/show-errors-messages.component';



@NgModule({
  declarations: [
    FormCostumerButtons,
    ShowErrorsMessagesComponent
  ],
  exports: [FormCostumerButtons, ShowErrorsMessagesComponent],
  imports: [
    CommonModule
  ]
})
export class CommonComponentModule { }
