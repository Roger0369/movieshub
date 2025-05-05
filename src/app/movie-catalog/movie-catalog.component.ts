import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MovieService, Movie } from '../movie.service'; 

@Component({
  selector: 'app-movie-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-catalog.component.html',
  styleUrls: ['./movie-catalog.component.css'],
})
export class MovieCatalogComponent {
  movies: Movie[] = [];
  showingFavorites = false;
  notificationMessage: string | null = null;

  constructor(public movieService: MovieService, private router: Router ) {
    this.loadMovies();
  }

  loadMovies() {
    this.movies = this.movieService.getMovies();
    this.showingFavorites = false;
  }

  showFavorites() {
    this.movies = this.movieService.getFavorites();
    this.showingFavorites = true;
  }

  toggleFavorite(name: string) {
    this.movieService.toggleFavorite(name);
    if (this.showingFavorites) {
      this.showFavorites();
    }
  }

  hideMovie(name: string) {
    if (confirm(`¿Deseas ocultar "${name}"?`)) {
      this.movieService.hideMovie(name);
      this.loadMovies();
  }
  this.notificationMessage = `La película "${name}" ha sido ocultada`;
  setTimeout(() => {
    this.notificationMessage = null;
  }, 2000);
}

  restoreHiddenMovies() {
    this.movieService.restoreHidden();
    this.loadMovies();
  }

  getKeyFromMovieName(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  seeDetails(movie: Movie) {
    const key = this.getKeyFromMovieName(movie.name);
    this.router.navigate(['/pelicula', key]);
  }
  
}




