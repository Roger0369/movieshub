// src/app/models/movie.model.ts
export interface Movie {
  id: number;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  isFavorite?: boolean;
  isHidden?: boolean;
}

