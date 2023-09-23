import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ListarFilmesComponent } from './views/listar-filmes/listar-filmes.component';
import { DetalhesFilmeComponent } from './views/detalhes-filme/detalhes-filme.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CardFilmeComponent } from './shared/card-filme/card-filme.component';
import { ListaCardsFilmesComponent } from './shared/lista-cards-filmes/lista-cards-filmes.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarFilmesComponent,
    DetalhesFilmeComponent,
    NavbarComponent,
    CardFilmeComponent,
    ListaCardsFilmesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
