import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MovieDetailComponent } from './movies/pages/movie-detail.component';

export const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'catalogo', loadComponent: () => import('./movie-catalog/movie-catalog.component').then(m => m.MovieCatalogComponent) },
  { path: 'pelicula/:name', component: MovieDetailComponent },
  { path: '**', redirectTo: '' },
];

