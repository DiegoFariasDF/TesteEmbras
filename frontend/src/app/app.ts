import { Component, OnInit } from '@angular/core';
import { Publicidade } from './publicidade';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})

export class App {
  constructor(private publicidadeService: Publicidade) { }

  ngOnInit() { }

  ObterTodasPublicidade(){
    this.publicidadeService.ObterTodasPublicidade()
    .then(Publicidade => console.log(Publicidade))
    .catch(error => console.error(error));
  }

  ObterUmaPublicidade(id: number) {
  this.publicidadeService.ObterPorId(id)
    .then(dado => console.log('Publicidade detalhada:', dado))
    .catch(err => console.error(err));
  }
}