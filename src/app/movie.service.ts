import { Injectable } from '@angular/core';

export interface Movie {
  name: string;
  category: string;
  description: string;
  image: string;
  infoPage: string;
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  private favorites = new Set<string>();
  private hidden = new Set<string>();
  private moviesCatalog: Movie[] = [
    {
      name: 'Mad Max: Fury Road',
      category: 'action',
      description: 'En un futuro postapocalíptico, Max se une a una rebelde para huir de un tirano en una carrera de supervivencia.',
      image: 'assets/madmax_furyroad.webp',
      infoPage: 'assets/movies_files/madmax.html',
    },
    {
      name: 'John Wick',
      category: 'action',
      description: 'Un exasesino regresa al mundo del crimen para vengar la muerte de su perro, un regalo de su esposa fallecida.',
      image: 'assets/johnwick.webp',
      infoPage: 'assets/movies_files/johnwick.html',
    },
    {
      name: 'Deadpool',
      category: 'action',
      description: 'Un mercenario con habilidades regenerativas busca venganza mientras rompe la cuarta pared con humor sarcástico.',
      image: 'assets/deadpool.webp',
      infoPage: 'assets/movies_files/deadpool.html',
    },
    {
      name: 'Mickey 17',
      category: 'fiction',
      description: 'Mickey es clonado accidentalmente, dos versiones de su personalidad se ven obligadas a trabajar juntas.',
      image: 'assets/mickey17.webp',
      infoPage: 'assets/movies_files/mickey17.html',
    },
  ];

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.favorites = new Set<string>(
        JSON.parse(localStorage.getItem('favoriteMovies') || '[]')
      );
      this.hidden = new Set<string>(
        JSON.parse(localStorage.getItem('hiddenMovies') || '[]')
      );
    }
  }

  getMovies(): Movie[] {
    return this.moviesCatalog.filter(m => !this.hidden.has(m.name));
  }

  getFavorites(): Movie[] {
    return this.moviesCatalog.filter(m => this.favorites.has(m.name));
  }

  toggleFavorite(name: string) {
    if (this.favorites.has(name)) {
      this.favorites.delete(name);
    } else {
      this.favorites.add(name);
      this.hidden.delete(name);
    }
    this.saveFavorites();
  }

  hideMovie(name: string) {
    this.hidden.add(name);
    this.saveHidden();
  }

  restoreHidden() {
    this.hidden.clear();
    this.saveHidden();
  }

  isFavorite(name: string): boolean {
    return this.favorites.has(name);
  }

  private saveFavorites() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('favoriteMovies', JSON.stringify([...this.favorites]));
    }
  }

  private saveHidden() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('hiddenMovies', JSON.stringify([...this.hidden]));
    }
  }
}