import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, SlicePipe, DecimalPipe } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import type { OverlayEventDetail } from '@ionic/core';
import { TmdbService } from '../services/tmdb';
import { Favorites } from '../services/favorites';
import { RouterLink } from '@angular/router';
import { RatingTextPipe } from '../pipes/rating-text-pipe';
import { IonIcon } from '@ionic/angular/standalone';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, DatePipe, SlicePipe, DecimalPipe,RouterLink,RatingTextPipe],
})
export class HomePage implements OnInit {
  movies: any[] = [];

  constructor(
    private toastController: ToastController,
    private tmdb: TmdbService,
    private fav: Favorites,
  ) {}

  ngOnInit() {
    //Carrega os filmes populares ao iniciar
    this.tmdb.getPopularMovies().subscribe({
      next: (data) => {
        this.movies = data.results;
      },
      error: (err) => console.error('Erro ao carregar filmes populares:', err),
    });
  }

  //Método chamado sempre que o usuário digita no campo de busca
  onSearchChange(event: any) {
    const query = event.target.value;

    if (!query || query.trim() === '') {
      // Se o campo estiver vazio, volta para filmes populares
      this.tmdb.getPopularMovies().subscribe({
        next: (data) => (this.movies = data.results),
        error: (err) => console.error('Erro ao buscar filmes populares:', err),
      });
      return;
    }

    //Usa o método existente do seu serviço
    this.tmdb.searchMovies(query).subscribe({
      next: (data) => {
        this.movies = data.results;
      },
      error: (err) => console.error('Erro ao buscar filmes:', err),
    });
  }

  //Adiciona o filme 
  adicionaFilme(movie: any) {
   this.fav.add(movie);  
      
  }
 

  setResult(event: CustomEvent<OverlayEventDetail>) {
    console.log(`Dismissed with role: ${event.detail.role}`);
  }
}
