import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Favorites } from '../services/favorites';
import { RouterLink } from '@angular/router';
import { RatingTextPipe } from '../pipes/rating-text-pipe';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, RatingTextPipe]
})
export class FavoritesPage {

  constructor(public fav: Favorites) {}

  remove(movie: any) {
    this.fav.remove(movie.id)
  }
}
