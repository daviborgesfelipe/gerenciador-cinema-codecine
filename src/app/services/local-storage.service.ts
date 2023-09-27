import { Injectable } from "@angular/core";
import { FilmesFavoritos } from "../models/FilmesFavoritos";

@Injectable({
  providedIn: 'root',
})

export class LocalStorageService {
  endereco: string = 'code-cine:historico@1.0.1'
  favoritos: FilmesFavoritos;


  constructor() {
    this.favoritos = {
      ids: []
    }
  }

  salvarDados(dados: FilmesFavoritos): void {
    const jsonString = JSON.stringify(dados)
    localStorage.setItem(this.endereco, jsonString)
    console.log("salvarDados", dados)
  } 

  carregarDados(): FilmesFavoritos {
    const dadosJson = localStorage.getItem(this.endereco);

    if (dadosJson)
      return JSON.parse(dadosJson) as FilmesFavoritos;

    return new FilmesFavoritos();
  }
}