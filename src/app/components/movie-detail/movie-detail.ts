import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MovieService } from '../../service/movie-service';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-movie-detail',
  imports: [],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetail implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly movieService = inject(MovieService);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => this.movieService.getMovieById(Number(params.get('id')))),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((movie) => this.movieService.selectedMovie.set(movie ?? null));
  }

  backToMovieList(): void {
    this.router.navigate(['/']);
  }

  addToWishList(movie: Movie): void {
    this.movieService.addToWishList(movie);
  }
}