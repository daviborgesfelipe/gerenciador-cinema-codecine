import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetalhesFilmeComponent } from './views/detalhes-filme/detalhes-filme.component';
import { ListarFilmesComponent } from './views/listar-filmes/listar-filmes.component';
import { BuscaFilmeComponent } from './views/busca-filme/busca-filme.component';

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
  {
    path: 'filmes/busca',
    component: BuscaFilmeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
