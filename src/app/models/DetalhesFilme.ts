export class DetalhesFilme {
  id: number;
  titulo: string;
  visaoGeral: string;
  dataLancamento: string;

  urlPoster: string;
  urlSlide: string;

  mediaNota: number;
  contagemVotos: number;

  genero: string[];

  fav: boolean

  constructor(
    id: number,
    titulo: string,
    visaoGeral: string,
    dataLancamento: string,
    urlPoster: string,
    urlSlide: string,
    mediaNota: number,
    contagemVotos: number,
    genero: string[]
    ) {
    this.id = id;
    this.titulo = titulo;
    this.visaoGeral = visaoGeral;
    this.dataLancamento = dataLancamento;
    this.urlPoster = `https://image.tmdb.org/t/p/original/${urlPoster}`;;
    this.urlSlide = urlPoster;
    this.mediaNota = mediaNota;
    this.contagemVotos = contagemVotos;
    this.genero = genero;   
    this.fav = false  
  }
}