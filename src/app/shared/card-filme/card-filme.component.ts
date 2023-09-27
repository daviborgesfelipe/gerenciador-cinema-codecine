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

  formatarData(): string {
    const partesData: string[] = this.filme.dataLancamento.split("-");
    const ano: string = partesData[0];
    const mes: string = partesData[1];
    const dia: string = partesData[2];
    
    return `${dia}-${mes}-${ano}`;
  }
}
