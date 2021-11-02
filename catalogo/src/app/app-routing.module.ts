import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoAddComponent, CatalogoComponent, CatalogoEditComponent, CatalogoViewComponent } from './catalogo';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CatalogoComponent },
      { path: 'add', component: CatalogoComponent },
      { path: ':id/edit', component: CatalogoComponent },
      { path: ':id', component: CatalogoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
