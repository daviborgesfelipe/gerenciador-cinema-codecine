import { API_KEY } from 'secrets';
import { CreditosFilme } from '../models/CreditosFilme';
import { DetalhesFilme } from '../models/DetalhesFilme';
import { Filme } from '../models/Filme';
import { TrailerFilme } from '../models/TrailerFilme';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilmeService implements OnInit {
  private NOTAS_API_URL = `https://api.themoviedb.org/3/movie/popular`;

  constructor(private http: HttpClient) {
    // this.http
    //   .get<any>(
    //     `${this.NOTAS_API_URL}?language=pt-BR&page=1`,
    //     this.obterHeaderAutorizacao()
    //   )
    //   .pipe(map((obj: any) => console.log('=====>', obj.results)));
  }
  ngOnInit(): void {
    this.http
      .get<any>(
        `${this.NOTAS_API_URL}?language=pt-BR&page=1`,
        this.obterHeaderAutorizacao()
      )
      .pipe(map((obj: any) => console.log('=====>', obj.results)));
  }

  selecionarFilmes(): Observable<Filme[]> {
    return this.http
      .get<any>(
        `${this.NOTAS_API_URL}?language=pt-BR&page=1`,
        this.obterHeaderAutorizacao()
      )
      .pipe(map((obj: any) => this.mapearListaFilmes(obj.results)));
  }

  public selecionarFilmePorId(id: number): Observable<DetalhesFilme> {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-br`;
    
    return this.http.get<DetalhesFilme>(
      `${url}?language=pt-BR&page=1`,
      this.obterHeaderAutorizacao()
    )
    .pipe(
      map(
        (obj: any) => this.mapearDetalheFilme(obj)
      )
    )
  }

  selecionarTrailerFilmePorId(id: number): Observable<TrailerFilme[]> {
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

















  // public selecionarFilmePorId(id: number): Promise<DetalhesFilme> {
  //   const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-br`;
    
  //   return fetch(url, this.obterHeaderAutorizacao())
  //   .then((res): Promise<any> => this.processarResposta(res))
  //   .then((obj: any): DetalhesFilme => this.mapearDetalheFilme(obj));
  // }


  private mapearListaFilmes(filmes: any): Filme[] {
    return filmes.map((filme: any) => {

      console.log(filme)
      return new Filme(
        filme.id,
        filme.title,
        filme.overview,
        filme.poster_path,
        filme.release_date
      )
    })
  }

  // constructor()
  // {
  //   fetch(`https://api.themoviedb.org/3/movie/615656/videos`,
  //   this.obterHeaderAutorizacao())
  //   .then((res) => res.json())
  //   .then((obj) => console.log("testeMovieApi", obj.results))
  // }

  public selecionarFilmePorPopularidade(): Promise<Filme[]> {
    const url = `https://api.themoviedb.org/3/movie/popular?language=pt-br`;

    return fetch(url, this.obterHeaderAutorizacao())
      .then((res: Response): Promise<any> => this.processarResposta(res))
      .then((obj: any): Filme[] => this.mapearListaFilmes(obj.results));
  }

  // public selecionarTrailerFilmePorId(id: number): Promise<TrailerFilme[]> {
  //   const url = `https://api.themoviedb.org/3/movie/${id}/videos`;

  //   return fetch(url, this.obterHeaderAutorizacao())
  //     .then((res: Response): Promise<any> => this.processarResposta(res))
  //     .then((obj: any): TrailerFilme[] =>
  //       this.mapearTrailerFilmes(obj.results)
  //     );
  // }

  public selecionarCreditosFilmePorId(id: number): Promise<CreditosFilme[]> {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=pt-br`;

    return fetch(url, this.obterHeaderAutorizacao())
      .then((res: Response): Promise<any> => this.processarResposta(res))
      .then((obj: any): CreditosFilme[] => this.mapearCreditosFilme(obj.cast));
  }

  // public selecionarFilmesPorIds(ids: number[]): Promise<DetalhesFilme[]> {
  //   const filmes = ids.map((id) => this.selecionarFilmePorId(id));
  //   return Promise.all(filmes);
  // }

  // public selecionarFilmes(): Promise<any[]> {
  //   const url = "https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1";

  //   return fetch(url, this.obterHeaderAutorizacao())
  //   .then((res: Response): Promise<Filme> => this.processarResposta(res))
  //   .then((obj: any): Filme[] => this.mapearListaFilmes(obj.results));
  // }

  private obterHeaderAutorizacao() {
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

  // private mapearListaFilmes(filmes: any): Filme[] {
  //   return filmes.map((filme: any) => {
  //     return new Filme(
  //       filme.id,
  //       filme.title,
  //       filme.overview,
  //       filme.poster_path,
  //       filme.urlPoster
  //     )
  //   })
  // }

  private mapearCreditosFilme(listaCreditos: any): CreditosFilme[] {
    return listaCreditos.map((res: any) => {
      return new CreditosFilme(
        res.id,
        res.name,
        res.character,
        res.known_for_department,
        res.profile_path
      );
    });
  }

  private mapearDetalheFilme(obj: any): DetalhesFilme {
    return new DetalhesFilme(
      obj.id,
      obj.title,
      obj.overview,
      obj.release_date,
      obj.poster_path,
      obj.backdrop_path,
      obj.vote_average,
      obj.vote_count,
      obj.genres.map((genre: any) => genre.name)
    );
  }

  private mapearTrailerFilmes(results: any): TrailerFilme[] {
    return results.map((res: any) => {
      return new TrailerFilme(res.id, res.key);
    });
  }
}
