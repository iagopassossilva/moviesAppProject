import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 
import { RatingTextPipe } from '../pipes/rating-text-pipe'; 
import { TmdbService } from '../services/tmdb';
import { TrailerDirective } from '../directives/trailer.directive';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.page.html',
  styleUrls: ['./detalhe.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, RatingTextPipe, TrailerDirective],
})
export class DetalhePage implements OnInit {

  movieId!: number;
  movie: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tmdb: TmdbService,
  ) {}

  ngOnInit() {
    this.movieId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.tmdb.pegaDetalheFilme(this.movieId).subscribe({
      next: (data) => this.movie = data,
      error: (err) => console.error('Erro ao carregar detalhes do filme:', err)
    });
  }
}
