import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router} from '@angular/router';
import { movieDetails, Movie } from '../data/movie-details';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent {
  movie?: Movie;
  suggestions: Movie[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      const name = params['name'];
      this.movie = movieDetails[name];
      if (this.movie) {
        this.suggestions = this.movie.suggestions.map(id => movieDetails[id]);
      }
    });
  }

    getKeyFromMovieName(name: string): string {
      return name.toLowerCase().replace(/[^a-z0-9]/g, '');
    }
  
    seeDetails(movie: Movie) {
      const key = this.getKeyFromMovieName(movie.name);
      const currentKey = this.route.snapshot.paramMap.get('name');
    
      if (key !== currentKey) {
        this.router.navigate(['/pelicula', key]);
      } else {
        this.loadMovie(key);
      }
    }

    loadMovie(name: string) {
      this.movie = movieDetails[name];
      if (this.movie) {
        this.suggestions = this.movie.suggestions.map(id => movieDetails[id]);
      }
    }
}