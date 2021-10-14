import { Component } from '@angular/core';
import { NavigationService } from './common-services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(navigation: NavigationService) {
    
  }
}
