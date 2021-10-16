import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogAddComponent, BlogComponent, BlogEditComponent, BlogListComponent, BlogViewComponent } from './blog';
import { CalculatorComponent } from './calculator/calculator.component';
import { ContactosAddComponent, ContactosComponent, ContactosEditComponent, ContactosListComponent, ContactosViewComponent } from './contactos';
import { DemosComponent } from './demos/demos.component';
import {
  LibrosAddComponent, LibrosEditComponent, LibrosListComponent, LibrosViewComponent
} from './libros';
import { HomeComponent, PageNotFoundComponent } from './main';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: BlogComponent },
  { path: 'blog', children: [
    { path: '', component: BlogListComponent},
    { path: 'add', component: BlogAddComponent},
    { path: ':id/edit', component: BlogEditComponent},
    { path: ':id', component: BlogViewComponent},
    { path: ':id/:kk', component: BlogViewComponent},
  ]},
  { path: 'inicio', component: HomeComponent },
  { path: 'demos', component: DemosComponent },
  { path: 'calculadora', component: CalculatorComponent },
  { path: 'contactos', children: [
    { path: '', component: ContactosListComponent},
    { path: 'add', component: ContactosAddComponent},
    { path: ':id/edit', component: ContactosEditComponent},
    { path: ':id', component: ContactosViewComponent},
    { path: ':id/:kk', component: ContactosViewComponent},
  ]},
  { path: '404.html', component: PageNotFoundComponent },
  {
    path: 'libros',
    children: [
      { path: '', component: LibrosListComponent },
      { path: 'add', component: LibrosAddComponent },
      { path: ':id/edit', component: LibrosEditComponent },
      { path: ':id', component: LibrosViewComponent },
      { path: ':id/:kk', component: LibrosViewComponent },
    ],
  },
  { path: 'antonie', redirectTo: 'contactos/27' },
  {
    path: 'config',
    loadChildren: () =>
      import('./config/config.module').then((mod) => mod.ConfigModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
