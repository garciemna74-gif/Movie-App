import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../interfaces/movie';
import { MovieService } from '../../service/movie-service';

@Component({
  imports: [],
  selector: 'app-wish-list',
  styleUrl: './wish-list.css',
  templateUrl: './wish-list.html',
})
export class WishList {
  private readonly router = inject(Router);
  private readonly movieService = inject(MovieService);
  readonly wishList = this.movieService.wishList;

  navigateTo(movie: Movie): void {
    this.router.navigate(['/', movie.id]);
  }
}
