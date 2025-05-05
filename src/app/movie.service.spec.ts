import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MovieCatalogComponent } from './movie-catalog/movie-catalog.component';
import { MovieService, Movie } from './movie.service';

describe('MovieCatalogComponent', () => {
  let component: MovieCatalogComponent;
  let fixture: ComponentFixture<MovieCatalogComponent>;
  let movieService: MovieService;
  let router: Router;

  const mockMovies: Movie[] = [
    {
      name: 'Mad Max: Fury Road',
      category: 'Action',
      description: 'Post-apocalyptic movie',
      image: 'assets/madmax.jpg',
      infoPage: 'madmax.html',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCatalogComponent],
      providers: [
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
        MovieService,
      ],
    }).compileComponents();

    movieService = TestBed.inject(MovieService);
    spyOn(movieService, 'getMovies').and.returnValue(mockMovies);
    spyOn(movieService, 'getFavorites').and.returnValue(mockMovies);
    spyOn(movieService, 'toggleFavorite');
    spyOn(movieService, 'hideMovie');
    spyOn(movieService, 'restoreHidden');

    fixture = TestBed.createComponent(MovieCatalogComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies initially', () => {
    expect(component.movies.length).toBe(1);
    expect(component.movies[0].name).toBe('Mad Max: Fury Road');
    expect(component.movies[0].category).toBe('Action');
    expect(component.showingFavorites).toBeFalse();
  });

  it('should show favorites and update state', () => {
    component.showFavorites();
    expect(component.movies).toEqual(mockMovies);
    expect(component.showingFavorites).toBeTrue();
  });

  it('should toggle favorite and reload favorites when showingFavorites is true', () => {
    component.showingFavorites = true;
    spyOn(component, 'showFavorites');

    component.toggleFavorite(mockMovies[0].name);

    expect(movieService.toggleFavorite).toHaveBeenCalledWith(mockMovies[0].name);
    expect(component.showFavorites).toHaveBeenCalled();
  });

  it('should toggle favorite without reloading favorites when showingFavorites is false', () => {
    component.showingFavorites = false;
    spyOn(component, 'showFavorites');

    component.toggleFavorite(mockMovies[0].name);

    expect(movieService.toggleFavorite).toHaveBeenCalledWith(mockMovies[0].name);
    expect(component.showFavorites).not.toHaveBeenCalled();
  });

  it('should hide movie and show notification when confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component, 'loadMovies');

    component.hideMovie(mockMovies[0].name);

    expect(movieService.hideMovie).toHaveBeenCalledWith(mockMovies[0].name);
    expect(component.loadMovies).toHaveBeenCalled();
    expect(component.notificationMessage).toContain('ha sido ocultada');
  });

  it('should restore hidden movies and reload', () => {
    spyOn(component, 'loadMovies');

    component.restoreHiddenMovies();

    expect(movieService.restoreHidden).toHaveBeenCalled();
    expect(component.loadMovies).toHaveBeenCalled();
  });
});