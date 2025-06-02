import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MovieCatalogComponent } from './movies-catalog/movies-catalog.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'movie-catalog', component: MovieCatalogComponent }
];

