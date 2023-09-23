import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DetalhesFilme } from 'src/app/models/DetalhesFilme';

@Component({
  selector: 'app-detalhes-filme',
  templateUrl: './detalhes-filme.component.html',
  styleUrls: ['./detalhes-filme.component.css']
})
export class DetalhesFilmeComponent {

  @Input() filmeDetalhes: DetalhesFilme = {
    id: 0,
    titulo: "Fuga das Galinha",
    visaoGeral: "milhoes de anos depois, as mesmas galinha de massinha voltaram, agora em vez de tortas é o nugget do .net o problema",
    dataLancamento: "11/12/2023",
    urlPoster: "zgBW2eNkN0Ez09GgRaWret90C1T.jpg",
    urlSlide: "FsgphDQqzFw",
    mediaNota: 9.7777,
    contagemVotos: 123123123,
    genero: ["luta","gastronomia","agricultura","vida no campo"],
    fav: true
  };

  trailerUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer){
    this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.filmeDetalhes.urlSlide}?controls=0`);
  }

}
