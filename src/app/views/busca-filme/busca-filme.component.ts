import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Filme } from 'src/app/models/Filme';
import { FilmeService } from 'src/app/services/filmes.service';

@Component({
  selector: 'app-busca-filme',
  templateUrl: './busca-filme.component.html',
  styleUrls: ['./busca-filme.component.css']
})
export class BuscaFilmeComponent implements OnInit{
  listaFilmesDaBusca: Filme[] = [];

  @Input() query: string = "Galinha"

  constructor(private filmeService: FilmeService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || 'Galinha'; // Use um valor padrão se a consulta estiver ausente
      this.filmeService.selecionarFilmePorNome(this.query).subscribe(filmes => {
        this.listaFilmesDaBusca = filmes;
      });
    });
  }
}
