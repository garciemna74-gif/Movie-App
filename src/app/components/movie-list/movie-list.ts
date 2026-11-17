import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieService } from '../../service/movie-service';
import { Router } from '@angular/router';
import { Movie } from '../../interfaces/movie';

@Component({
  imports: [],
  selector: 'app-movie-list',
  styleUrl: './movie-list.css',
  templateUrl: './movie-list.html',
})
export class MovieList implements OnInit {
  private readonly router = inject(Router, { optional: true });
  private readonly movieService = inject(MovieService);
  readonly movies = this.movieService.movieList;
  readonly loading = signal(true);
  readonly errorMessage = signal('');

  ngOnInit(): void {
    this.movieService.getMovieList().subscribe({
      next: () => {
        this.loading.set(false);
      },
      error: (error: unknown) => {
        this.loading.set(false);
        this.errorMessage.set('Could not load movies. Check your connection and API settings.');
        console.error('Failed to load movies:', error);
      },
    });
  }

  navigateTo(movie: Movie): void {
    if (this.router) {
      this.router.navigate(['/', movie.id]);
    }
  }
}
