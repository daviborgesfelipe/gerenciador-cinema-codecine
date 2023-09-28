import { CreditosFilme } from '../models/CreditosFilme';
import { DetalhesFilme } from '../models/DetalhesFilme';
import { Filme } from '../models/Filme';
import { TrailerFilme } from '../models/TrailerFilme';
import { Observable, map, forkJoin  } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, Query } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilmeService implements OnInit {
  private FILMES_POPULARES_API_URL = `https://api.themoviedb.org/3/movie/popular`;
  private FILMES_BEM_AVALIADOS_API_URL = `https://api.themoviedb.org/3/movie/top_rated`;
  private FILMES_LANCAMENTOS_API_URL = `https://api.themoviedb.org/3/movie/upcoming`;
  private FILMES_BUSCA_API_URL = `https://api.themoviedb.org/3/search/movie?query=`;

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

  public selecionarFilmesEmAlta(page: string | number): Observable<Filme[]> {
    return this.http
      .get<any>(
        `${this.FILMES_POPULARES_API_URL}?language=pt-BR&page=`+ page,
        this.obterHeaderAutorizacao()
      )
      .pipe(map((obj: any) => this.mapearListaFilmes(obj.results)));
  }

  public selecionarFilmesBemAvaliados(page: string | number): Observable<Filme[]> {
    return this.http
      .get<any>(
        `${this.FILMES_BEM_AVALIADOS_API_URL}?language=pt-BR&page=`+ page,
        this.obterHeaderAutorizacao()
      )
      .pipe(map((obj: any) => this.mapearListaFilmes(obj.results)));
  }

  public selecionarFilmesLancamento(page: string | number): Observable<Filme[]> {
    return this.http
      .get<any>(
        `${this.FILMES_LANCAMENTOS_API_URL}?language=pt-BR&page=`+ page,
        this.obterHeaderAutorizacao()
      )
      .pipe(map((obj: any) => this.mapearListaFilmes(obj.results)));
  }

  public selecionarFilmePorId(id: number): Observable<DetalhesFilme> {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-br`;
    
    return this.http.get<DetalhesFilme>(
      `${url}?language=pt-BR`,
      this.obterHeaderAutorizacao()
    )
    .pipe(
      map(
        (obj: any) => this.mapearDetalheFilme(obj)
      )
    )
  }

  public selecionarFilmePorNome(query: string): Observable<Filme[]> {
    return this.http
      .get<any>(
        this.FILMES_BUSCA_API_URL + query + "&language=pt-BR",
        this.obterHeaderAutorizacao()
      )
      .pipe(map((obj: any) => this.mapearListaFilmes(obj.results)));
  }

  public selecionarTrailerFilmePorId(id: number): Observable<TrailerFilme[]> {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos`;
    return this.http.get<any>(
      `${url}?language=pt-BR&page=1`,
       this.obterHeaderAutorizacao()
    )
    .pipe(
      map(
        (obj: any) => this.mapearTrailerFilmes(obj.results)
      )
    )
  }

  public selecionarCreditosFilmePorId(id: number): Observable<CreditosFilme[]> {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits`;
    return this.http.get<any>(
      `${url}?language=pt-BR&page=1`,
       this.obterHeaderAutorizacao()
    )
    .pipe(
      map(
        (obj: any) =>  this.mapearCreditosFilme(obj.cast)
      )
    )
  }

  public selecionarFilmesPorIds(ids: number[]): Observable<DetalhesFilme[]> {
    const observables = ids.map(id => this.selecionarFilmePorId(id));
    
    return forkJoin(observables);
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
    const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjI5ZGFkM2Q4MTMzNTg2M2Q5NmQ0ZmMwZWMzYWEyYyIsInN1YiI6IjY0Zjg5ZmJhYThiMmNhMDEzODRiMjY2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4cBZHI69PPnTqIY-N26PdMrYJ0r2APpyIyDlD7FB0yU"; 

    return {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    };
  }

  private processarResposta(resposta: Response): Promise<any> {
    if (resposta.ok) return resposta.json();

    throw new Error('Filme não encontrado!');
  }
}
