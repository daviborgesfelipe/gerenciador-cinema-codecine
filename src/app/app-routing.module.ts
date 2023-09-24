import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetalhesFilmeComponent } from './views/detalhes-filme/detalhes-filme.component';
import { ListarFilmesComponent } from './views/listar-filmes/listar-filmes.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'filmes/inicial',
    pathMatch: 'full' 
  },
  {
    path: 'filmes/inicial',
    component: ListarFilmesComponent
  },
  {
    path: 'filmes/detalhes/:id',
    component: DetalhesFilmeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
