import { Component, Input, OnInit } from '@angular/core';
import { Filme } from 'src/app/models/Filme';

@Component({
  selector: 'app-card-busca',
  templateUrl: './card-busca.component.html',
  styleUrls: ['./card-busca.component.css']
})
export class CardBuscaComponent{

  @Input() listaFilmes: Filme[] = []

  @Input() filme: Filme = {
    id: 0,
    titulo: "teste",
    visaoGeral: "teste",
    dataLancamento: "",
    urlDetalhes: "",
    urlPoster: "",
    fav: true
  };

  constructor(){}

  formatarData(): string {
    const partesData: string[] = this.filme.dataLancamento.split("-");
    const ano: string = partesData[0];
    const mes: string = partesData[1];
    const dia: string = partesData[2];
    
    return `${dia}-${mes}-${ano}`;
  }
}
