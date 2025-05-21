import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';  // <-- IMPORTANTE
import { Observable } from 'rxjs';

// Define Movie model (puedes mover esto a models si quieres)
export interface Movie {
  id: number;
  name: string;
  description: string;
  image: string;
  isFavorite: boolean;
  isHidden: boolean;
}

@Component({
  selector: 'app-movie-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movies-catalog.component.html',
  styleUrls: ['./movies-catalog.component.css'],
})
export class MovieCatalogComponent {
  movies: Movie[] = [];
  showingFavorites = false;
  notificationMessage: string | null = null;
movieService: any;

  // Inyectamos HttpClient
  constructor(private http: HttpClient, private router: Router) {
    this.loadMovies();
  }

  loadMovies() {
    this.http.get<Movie[]>('http://localhost:5000/movies')
      .subscribe({
        next: (data) => {
          this.movies = data;
          this.showingFavorites = false;
        },
        error: (err) => {
          console.error('Error loading movies', err);
        }
      });
  }

  showFavorites() {
    this.http.get<Movie[]>('http://localhost:5000/movies/favorites')
      .subscribe({
        next: (data) => {
          this.movies = data;
          this.showingFavorites = true;
        },
        error: (err) => {
          console.error('Error loading favorites', err);
        }
      });
  }

  toggleFavorite(name: string) {
    this.http.post(`http://localhost:5000/movies/toggle-favorite`, { name })
      .subscribe({
        next: () => {
          if (this.showingFavorites) {
            this.showFavorites();
          } else {
            this.loadMovies();
          }
        },
        error: (err) => {
          console.error('Error toggling favorite', err);
        }
      });
  }

  hideMovie(name: string) {
    if (confirm(`¿Deseas ocultar "${name}"?`)) {
      this.http.post(`http://localhost:5000/movies/hide`, { name })
        .subscribe({
          next: () => {
            this.notificationMessage = `La película "${name}" ha sido ocultada`;
            this.loadMovies();
            setTimeout(() => {
              this.notificationMessage = null;
            }, 2000);
          },
          error: (err) => {
            console.error('Error hiding movie', err);
          }
        });
    }
  }

  restoreHiddenMovies() {
    this.http.post(`http://localhost:5000/movies/restore-hidden`, {})
      .subscribe({
        next: () => {
          this.loadMovies();
        },
        error: (err) => {
          console.error('Error restoring hidden movies', err);
        }
      });
  }

  getKeyFromMovieName(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  seeDetails(movie: Movie) {
    const key = this.getKeyFromMovieName(movie.name);
    this.router.navigate(['/pelicula', key]);
  }
}
