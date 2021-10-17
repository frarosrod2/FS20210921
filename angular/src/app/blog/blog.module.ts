import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MyCoreModule } from 'src/lib/my-core';
import { MainModule } from '../main';
import { CommonServicesModule } from '../common-services';
import { CommonComponentModule } from '../common-component';
import { BlogAddComponent, BlogEditComponent, BlogListComponent, BlogViewComponent, BLOG_COMPONENTES } from '.';
import { AuthGuard, AuthService } from '../security';

@NgModule({
  declarations: [
    BLOG_COMPONENTES
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([]),
    MyCoreModule,
    MainModule,
    CommonServicesModule, MainModule, CommonComponentModule
  ],
  exports: [BlogComponent]
})
export class BlogModule { }
