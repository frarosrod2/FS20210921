import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CatalogoComponent },
    //   { path: 'add', component: BlogAddComponent },
    //   { path: ':id/edit', component: BlogEditComponent },
    //   { path: ':id', component: BlogViewComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
