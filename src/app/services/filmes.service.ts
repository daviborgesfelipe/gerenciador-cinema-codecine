import { CreditosFilme } from '../models/CreditosFilme';
import { DetalhesFilme } from '../models/DetalhesFilme';
import { Filme } from '../models/Filme';
import { TrailerFilme } from '../models/TrailerFilme';
import { Observable, map, forkJoin  } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, Query } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilmeService implements OnInit {
  private API_URL = `https://api.themoviedb.org/3/`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.http
    //   .get<any>(
    //     `${this.NOTAS_API_URL}?language=pt-BR&page=1`,
    //     this.obterHeaderAutorizacao()
    //   )
    //   .pipe(map((obj: any) => console.log('=====>', obj.results)));
  }

  // METODOS PUBLICOS
  public selecionarFilmesEmAlta(page: number): Observable<Filme[]> {
    return this.http
      .get<any>(
        this.API_URL + `movie/popular?language=pt-BR&page=`+ page,
        this.obterHeaderAutorizacao()
      )
      .pipe(
        map(
          (obj: any) => this.mapearListaFilmes(obj.results)
        )
      );
  }

  public selecionarFilmesBemAvaliados(page: number): Observable<Filme[]> {
    return this.http
      .get<any>(
        this.API_URL + `movie/top_rated?language=pt-BR&page=`+ page,
        this.obterHeaderAutorizacao()
      )
      .pipe(
        map(
          (obj: any) => this.mapearListaFilmes(obj.results)
        )
      );
  }

  public selecionarFilmesLancamento(page: number): Observable<Filme[]> {
    return this.http
      .get<any>(
        this.API_URL + `movie/upcoming?language=pt-BR&page=`+ page,
        this.obterHeaderAutorizacao()
      )
      .pipe(
        map(
          (obj: any) => this.mapearListaFilmes(obj.results)
        )
      );
  }

  public selecionarFilmePorId(id: number): Observable<DetalhesFilme> {
    return this.http
      .get<DetalhesFilme>(
        this.API_URL + `movie/${id}?language=pt-br`,
        this.obterHeaderAutorizacao()
      )
      .pipe(
        map(
          (obj: any) => this.mapearDetalheFilme(obj)
        )
      )
  }

  public selecionarTrailerFilmePorId(id: number): Observable<TrailerFilme[]> {
    return this.http
      .get<any>(
         this.API_URL + `movie/${id}/videos?language=pt-BR&page=1`,
         this.obterHeaderAutorizacao()
      )
      .pipe(
        map(
          (obj: any) => this.mapearTrailerFilmes(obj.results)
        )
      ) 
  }

  public selecionarCreditosFilmePorId(id: number): Observable<CreditosFilme[]> {
    return this.http
      .get<any>(
        this.API_URL + `movie/${id}/credits?language=pt-BR&page=1`,
        this.obterHeaderAutorizacao()
      )
      .pipe(
        map(
          (obj: any) =>  this.mapearCreditosFilme(obj.cast.concat(obj.crew))
        )
      )
  }

  public selecionarFilmesPorIds(ids: number[]): Observable<DetalhesFilme[]> {
    const observables = ids.map(id => this.selecionarFilmePorId(id));
    
    return forkJoin(observables);
  }
  
  public selecionarFilmePorNome(query: string): Observable<Filme[]> {
    return this.http
      .get<any>(
        this.API_URL + "search/movie?query=" + query + "&language=pt-BR",
        this.obterHeaderAutorizacao()
      )
      .pipe(
        map(
          (obj: any) => this.mapearListaFilmes(obj.results)
        )
      );
  }

  // METODOS PRIVADOS
  private mapearListaFilmes(filmes: any): Filme[] {
    return filmes.map((filme: any) => {

      return new Filme(
        filme.id,
        filme.title,
        filme.overview,
        filme.poster_path,
        filme.release_date
      )
    })
  }

  private mapearCreditosFilme(results: any): CreditosFilme[] {
    return results.map((credito: any) => {
      return new CreditosFilme(
        credito.id,
        credito.name,
        credito.character,
        credito.known_for_department,
        credito.profile_path
      );
    })
  }

  private mapearDetalheFilme(detalhe: any): DetalhesFilme {
    return new DetalhesFilme(
      detalhe.id,
      detalhe.title,
      detalhe.overview,
      detalhe.release_date,
      detalhe.poster_path,
      detalhe.backdrop_path,
      detalhe.vote_average,
      detalhe.vote_count,
      detalhe.genres.map((genre: any) => genre.name)
    );
  }

  private mapearTrailerFilmes(results: any): TrailerFilme[] {
    return results.map((trailer: any) => {
      return new TrailerFilme(trailer.id, trailer.key);
    });
  }

  private obterHeaderAutorizacao() {

    return {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: environment.API_KEY,
      },
    };
  }

  private processarResposta(resposta: Response): Promise<any> {
    if (resposta.ok) return resposta.json();

    throw new Error('Filme não encontrado!');
  }
}
