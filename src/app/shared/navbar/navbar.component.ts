import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FilmeService } from 'src/app/services/filmes.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  active = 1;
  termoBusca: string = '';

  constructor(private router: Router, private filmeService: FilmeService) {}

  buscarFilmes() {
    this.router.navigate(['/filmes/busca'], { queryParams: { query: this.termoBusca } });
  }
}
