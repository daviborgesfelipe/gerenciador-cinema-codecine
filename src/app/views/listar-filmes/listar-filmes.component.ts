import { Component, Input } from '@angular/core';
import { Filme } from 'src/app/models/Filme';
import { FilmeService } from 'src/app/services/filmes.service';

@Component({
  selector: 'app-listar-filmes',
  templateUrl: './listar-filmes.component.html',
  styleUrls: ['./listar-filmes.component.css']
})
export class ListarFilmesComponent {
  @Input() listaFilmes: Filme[] = [];

  constructor(private filmeService: FilmeService){
  }

  ngOnInit(): void {
    this.filmeService.selecionarFilmes().subscribe(
      _listaFilmes => {
        this.listaFilmes = _listaFilmes
        console.log("==>", this.listaFilmes.map(x => x.urlPoster))
      }
    )
  }
}
