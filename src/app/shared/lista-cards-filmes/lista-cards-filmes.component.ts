import { Component, Input, OnInit } from '@angular/core';
import { Filme } from 'src/app/models/Filme';
import { FilmeService } from 'src/app/services/filmes.service';

@Component({
  selector: 'app-lista-cards-filmes',
  templateUrl: './lista-cards-filmes.component.html',
  styleUrls: ['./lista-cards-filmes.component.css']
})
export class ListaCardsFilmesComponent{
  @Input() listaFilmes: Filme[] = []
}
