import { Component, Input, OnInit } from '@angular/core';
import { Filme } from 'src/app/models/Filme';

@Component({
  selector: 'app-lista-cards-busca',
  templateUrl: './lista-cards-busca.component.html',
  styleUrls: ['./lista-cards-busca.component.css']
})
export class ListaCardsBuscaComponent{
  @Input() listaFilmes: Filme[] = []
  @Input() tipo: string = ""
}
