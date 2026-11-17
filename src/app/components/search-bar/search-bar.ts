import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from '../../service/movie-service';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-search-bar',
  styleUrl: './search-bar.css',
  templateUrl: './search-bar.html',
})
export class SearchBar {
  protected readonly faMagnifyingGlass = faMagnifyingGlass;
  private readonly movieService = inject(MovieService);

  getMovieByTitle(title: string) {
    this.movieService.filterMovies(title);
  }
}

