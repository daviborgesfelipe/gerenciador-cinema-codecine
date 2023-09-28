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
  listaFilmesConsagrados: Filme[] = []; 
  listaFilmesLancamentos: Filme[] = [];
  listaFilmesEmAlta: Filme[] = [];
  listaFilmesFav: any[] = [];

  page: number = 1
  pageFav: number = 1;
  active = 1;
  
  tipoFavorito: string = "Filmes Favoritos"
  tipoPopulares: string = "Filmes em Alta"
  tipoBemAvaliados: string = "Filmes Consagrados"
  tipoLancamentos: string = "Filmes Lançamentos"

  constructor(private filmeService: FilmeService, private localStorageService: LocalStorageService){
    this.listaIdsFilmesFav = this.localStorageService.carregarDados();
  }

  ngOnInit(): void {
    this.listaIdsFilmesFav = this.localStorageService.carregarDados()
    this.atualizarListas();
  }

  private atualizarListas() {
    this.filmeService.selecionarFilmesEmAlta(this.page).subscribe(
      _listaFilmes => {
        this.listaFilmesEmAlta = _listaFilmes;
      }
    );

    this.filmeService.selecionarFilmesBemAvaliados(this.page).subscribe(
      _listaFilmes => {
        this.listaFilmesConsagrados = _listaFilmes;
      }
    );

    this.filmeService.selecionarFilmesLancamento(this.page).subscribe(
      _listaFilmes => {
        this.listaFilmesLancamentos = _listaFilmes;
      }
    );

    this.filmeService.selecionarFilmesPorIds(this.listaIdsFilmesFav.ids).subscribe(
      _listaFilmes => {
        this.listaFilmesFav = _listaFilmes;
      }
    );
  }

  onListasEvent(event: number){
    this.page = event;
    this.atualizarListas();
  }

  onListaFavEvent(event: any) {
    this.pageFav = event;
  }
}
