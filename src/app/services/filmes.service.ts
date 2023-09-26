import { API_KEY } from 'secrets';
import { CreditosFilme } from '../models/CreditosFilme';
import { DetalhesFilme } from '../models/DetalhesFilme';
import { Filme } from '../models/Filme';
import { TrailerFilme } from '../models/TrailerFilme';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilmeService implements OnInit {
  private NOTAS_API_URL = `https://api.themoviedb.org/3/movie/popular`;

  constructor(private http: HttpClient) {}

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
        Authorization: `Bearer ${API_KEY}`,
      },
    };
  }

  private processarResposta(resposta: Response): Promise<any> {
    if (resposta.ok) return resposta.json();

    throw new Error('Filme não encontrado!');
  }
}
