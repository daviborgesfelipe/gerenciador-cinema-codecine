import { Component, Input } from '@angular/core';
import { Filme } from 'src/app/models/Filme';

@Component({
  selector: 'app-card-filme',
  templateUrl: './card-filme.component.html',
  styleUrls: ['./card-filme.component.css']
})

export class CardFilmeComponent {

  @Input() filme: Filme = {
    id: 0,
    titulo: "",
    visaoGeral: "",
    dataLancamento: "",
    urlDetalhes: "",
    urlPoster: "",
    fav: true
  };

  constructor(){}
}
