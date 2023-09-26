import { Component, Input, OnInit } from '@angular/core';
import { CreditosFilme } from 'src/app/models/CreditosFilme';

@Component({
  selector: 'app-tabela-creditos-filmes',
  templateUrl: './tabela-creditos-filmes.component.html',
  styleUrls: ['./tabela-creditos-filmes.component.css']
})
export class TabelaCreditosFilmesComponent {
  @Input() departamentos: { nome: string, nomes: string[] }[] = [];

  constructor() { }
}
