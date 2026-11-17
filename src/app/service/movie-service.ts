import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Movie } from '../interfaces/movie';
import { map, Observable, tap } from 'rxjs';
import { MovieResponse } from '../interfaces/movie-response';
@Injectable({
    providedIn: 'root'
})

export class MovieService {
    private readonly http=inject(HttpClient);
    private readonly url=environment.url_api;
    private readonly apiKey=environment.api_key;
    private readonly url_movie_api=environment.url_movie_api;
    private allMovies: Movie[] = [];
    public movieList = signal<Movie[]>([]);
    public movie=signal<Movie | null>(null);
    public selectedMovie = signal<Movie | null>(null);
    public wishList = signal<Movie[]>(this.loadWishList());
   getMovieList(): Observable<Movie[]> {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}`;
  console.log('URL appelée :', url);
  return this.http.get<MovieResponse>(url).pipe(
    map((response) => response.results),
    tap((movies) => {
      this.allMovies = movies;
      this.movieList.set(movies);
    }),
  );
}

    filterMovies(title: string): Movie[] {
        const normalizedTitle = title.trim().toLowerCase();
        const filteredMovies = normalizedTitle
            ? this.allMovies.filter((movie) => movie.title.toLowerCase().includes(normalizedTitle))
            : this.allMovies;

        this.movieList.set(filteredMovies);
        return filteredMovies;
    }
    getMovieById(id: number): Observable<Movie> {
        return this.http.get<Movie>(`${this.url_movie_api}${id}?api_key=${this.apiKey}`).pipe(
            map((response) => response),
        );
    }
    addToWishList(movie: Movie): void {
        if (this.wishList().some((m) => m.id === movie.id)) {
            return;
        }
        this.wishList.update((list) => [...list, movie]);
        localStorage.setItem('wishlist', JSON.stringify(this.wishList()));
    }

    private loadWishList(): Movie[] {
        try {
            return JSON.parse(localStorage.getItem('wishlist') || '[]');
        } catch {
            return [];
        }
    }

}

