import {Component, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FilmBackendService} from '../../services/film-backend.service';
import 'rxjs/add/operator/takeWhile';
import {TrailerDataModel} from '../../models/trailer-data.model';
import {MovieDataModel} from '../../models/movie-data.model';

@Component({
  selector: 'f-top20',
  templateUrl: './top20.component.html',
  styleUrls: ['./top20.component.css']
})
export class Top20Component implements OnInit, OnDestroy {
  loading = false;
  errorMessage = '';
  loadingMessage = '';
  trailer: any;
  trailers = Array<TrailerDataModel>(0);
  movies = Array<MovieDataModel>(0);
  alive = true;

  constructor(private filmBackendService: FilmBackendService) { }

  ngOnInit() {
    this.getListOfMoviesFunction();

  }

  ngOnDestroy() {
    this.alive = false;
  }

  public getListOfMoviesFunction() {
    this.loading = true;
    this.errorMessage = '';
    this.loadingMessage = 'Please wait, data loading...';
    this.filmBackendService.getListOfFilms('1991', '2017')
      .takeWhile(() => this.alive)
      .subscribe(
        (res: any) => {

          this.loading = false;
          this.loadingMessage = '';
          console.log(res);
          const _movies = (<Array<MovieDataModel>>res.data.movies).filter((movie) => {
            return movie.ranking < 21;
          });
          _movies.forEach((movie) => {
            movie.directors.forEach((director) => {
              director.sanitizeDirectorUrl = 'https://www.imdb.com/find?q=' + director.name.split(' ').join('%20') + '&s=nm&ref_=fn_nm';
            });
          });
          this.movies = _movies;
          console.log(this.movies);
          this.getTrailerOfFilmFunction(this.movies['0'].title.split(' ').join('%20'));
        },
        (res: any) => {
          this.loading = false;
          this.loadingMessage = '';
          this.errorMessage = 'There are server problems... ' + res.message;
          console.log(res);
        }
      );
  }

  public getTrailerOfFilmFunction(title: any) {
    // this.loading = true;
    // this.errorMessage = '';
    // this.loadingMessage = 'Please wait, data loading...';
    this.filmBackendService.getTrailerOfFilm(title)
      .takeWhile(() => this.alive)
      .subscribe(
        (res: any) => {
          // this.loading = false;
          // this.loadingMessage = '';
          console.log(res);
          // this.movies = _movies;
          // console.log(this.movies);
        },
        (res: any) => {
          // this.loading = false;
          // this.loadingMessage = '';
          // this.errorMessage = 'There are server problems... ' + res.message;
          console.log(res);
        }
      );
  }

  public openInNewWindow(url: string) {
    window.open(url, '_blank');
  }
  public closeAlert() {
    this.errorMessage = '';
  }
}
