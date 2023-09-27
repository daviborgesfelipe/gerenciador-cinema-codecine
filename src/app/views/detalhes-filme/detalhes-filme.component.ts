import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FilmesFavoritos } from 'src/app/models/FilmesFavoritos';
import { FilmeService } from 'src/app/services/filmes.service';
import { CreditosFilme } from 'src/app/models/CreditosFilme';
import { DetalhesFilme } from 'src/app/models/DetalhesFilme';
import { TrailerFilme } from 'src/app/models/TrailerFilme';

@Component({
  selector: 'app-detalhes-filme',
  templateUrl: './detalhes-filme.component.html',
  styleUrls: ['./detalhes-filme.component.css']
})
export class DetalhesFilmeComponent implements OnInit{
  
  trailerUrl: SafeResourceUrl;

  filmeDetalhes: DetalhesFilme = {
    id: 0,
    titulo: "",
    visaoGeral: "",
    dataLancamento: "",
    urlPoster: "",
    urlSlide: "FsgphDQqzFw",
    mediaNota: 0,
    contagemVotos: 0,
    genero: ["luta","gastronomia","agricultura","vida no campo"],
    fav: true
  };

  trailerFilme: TrailerFilme = {
    id: "",
    sourceUrl: ""
  };
  
  departamentos: { nome: string, nomes: string[] }[] = [];
  listaFavoritos: FilmesFavoritos;
  listaCreditos: any[] = []
  listaTrailers: any[] = []
  id: number;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private filmeService: FilmeService,
    private localStorageService: LocalStorageService
  ){
    this.localStorageService = new LocalStorageService();
    this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.trailerFilme.sourceUrl);
    this.listaFavoritos = this.localStorageService.carregarDados();
    console.log(this.listaFavoritos)
    this.id = parseInt(this.route.snapshot.paramMap.get('id') as string);
    console.log(this.id)
  }


  ngOnInit(): void {
    
    this.id = parseInt(this.route.snapshot.paramMap.get('id') as string);
    console.log(this.id)
    this.filmeService.selecionarFilmePorId(this.id).subscribe((filme: DetalhesFilme) => {
      this.filmeDetalhes = filme;
    });
    
    this.filmeService.selecionarTrailerFilmePorId(this.id).subscribe((_trailerFilme: TrailerFilme[]) => {
      this.listaTrailers.push(_trailerFilme);
      
      if (this.listaTrailers.length > 0) {
        const url = this.listaTrailers[0][0].sourceUrl;
        this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      }
    });
    
    this.filmeService.selecionarCreditosFilmePorId(this.id).subscribe((_creditosFilme: CreditosFilme[]) => {
      this.listaCreditos.push(_creditosFilme)
      this.listaCreditos.map((x: any) => 
        x.forEach((credito: any) => {
          const departamento = credito.departamento;
        
          const departamentoExistente = this.departamentos.find(d => d.nome === departamento);
        
          if (departamentoExistente) {
            departamentoExistente.nomes.push(credito.nome);
          } else {
            this.departamentos.push({ nome: departamento, nomes: [credito.nome] });
          }
        })
      )
    })
  }

  atualizarListaFavoritos(): void {
    if(this.listaFavoritos.ids.includes(this.id)) {
      this.listaFavoritos.ids = this.listaFavoritos.ids.filter(x => x != this.id);
    }
    else {
      this.listaFavoritos.ids.push(this.id);
    }

    this.localStorageService.salvarDados(this.listaFavoritos);
    console.log(this.listaFavoritos)
    // this.atualizarIconFav();
  }

  // atualizarIconFav(): void {
  //   if(this.listaFavoritos.ids.includes(this.id)) {
  //     lblFavorito.className = "bi bi-heart-fill fs-2 text-warning";
  //   }
  //   else {
  //     lblFavorito.className = "bi bi-heart fs-2 text-warning";
  //   }
  // }
}
