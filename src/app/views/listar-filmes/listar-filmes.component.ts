import { Component, Input } from '@angular/core';
import { Filme } from 'src/app/models/Filme';
import { FilmesFavoritos } from 'src/app/models/FilmesFavoritos';
import { FilmeService } from 'src/app/services/filmes.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-listar-filmes',
  templateUrl: './listar-filmes.component.html',
  styleUrls: ['./listar-filmes.component.css']
})
export class ListarFilmesComponent {
  listaIdsFilmesFav: FilmesFavoritos;
  listaFilmes: Filme[] = [];
  listaFilmesFav: any[] = [];
  page: number = 1
  pageFav: number = 1;
  tipoFavorito: string = "Filmes Favoritos"
  tipoPopulares: string = "Filmes em Alta"

  constructor(private filmeService: FilmeService, private localStorageService: LocalStorageService){
    this.listaIdsFilmesFav = this.localStorageService.carregarDados();
  }

  ngOnInit(): void {
    this.listaIdsFilmesFav = this.localStorageService.carregarDados()
    this.filmeService.selecionarFilmes(this.page).subscribe(
      _listaFilmes => {
        this.listaFilmes = _listaFilmes
      }
    )
    this.filmeService.selecionarFilmesPorIds(this.listaIdsFilmesFav.ids).subscribe(
      _listaFilmes => {
        this.listaFilmesFav = _listaFilmes
      }
    )
  }

  pageChangeEvent(event: number){
    this.page = event;
    console.log(this.page)
    this.filmeService.selecionarFilmes(this.page).subscribe(
      _listaFilmes => {
        this.listaFilmes = _listaFilmes
      }
    )
  }
  onTableDataChange(event: any) {
    this.pageFav = event;
  }
}
