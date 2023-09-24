import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DetalhesFilme } from 'src/app/models/DetalhesFilme';
import { Filme } from 'src/app/models/Filme';
import { TrailerFilme } from 'src/app/models/TrailerFilme';
import { FilmeService } from 'src/app/services/filmes.service';

@Component({
  selector: 'app-detalhes-filme',
  templateUrl: './detalhes-filme.component.html',
  styleUrls: ['./detalhes-filme.component.css']
})
export class DetalhesFilmeComponent implements OnInit{

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

  listaTrailers: any[] = []
  trailerUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private filmeService: FilmeService){
    this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.trailerFilme.sourceUrl);
  }


  ngOnInit(): void {
    let idx: number = parseInt(this.route.snapshot.paramMap.get('id') as string);
  
    this.filmeService.selecionarFilmePorId(idx).subscribe((filme: DetalhesFilme) => {
      this.filmeDetalhes = filme;
    });
  
    this.filmeService.selecionarTrailerFilmePorId(idx).subscribe((_trailerFilme: TrailerFilme[]) => {
      this.listaTrailers.push(_trailerFilme);
  
      if (this.listaTrailers.length > 0) {
        const url = this.listaTrailers[0][0].sourceUrl;
        this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      }
    });
  }

}
