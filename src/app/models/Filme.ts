export class Filme{
  id: number;
  titulo: string;
  dataLancamento: string;
  visaoGeral: string;
  urlPoster: string;

  fav?: boolean

  readonly urlDetalhes: string;

  constructor(
    id: number,
    titulo: string,
    visaoGeral: string,
    urlPoster: string,
    dataLancamento: string
  ) {
    this.id = id;
    this.titulo = titulo;
    this.visaoGeral = visaoGeral;
    this.dataLancamento = dataLancamento
    this.urlPoster = `https://image.tmdb.org/t/p/original/` + urlPoster;
    this.urlDetalhes = urlPoster;
  }

  formatarData?(data: string): string {
    const partesData: string[] = data.split("-");
    const ano: string = partesData[0];
    const mes: string = partesData[1];
    const dia: string = partesData[2];
    
    return `${dia}-${mes}-${ano}`;
  }
}