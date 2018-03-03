import {Component, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FilmBackendService} from '../../services/film-backend.service';
import 'rxjs/add/operator/takeWhile';
import {TrailerDataModel} from '../../models/trailer-data.model';
import {MovieDataModel} from '../../models/movie-data.model';
import {toPromise} from 'rxjs/operator/toPromise';
import {async} from '@angular/core/testing';

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
  trailers = Array<{ 'idIMDB': string, 'trailer': TrailerDataModel }>(0);
  moviesAll = Array<MovieDataModel>(0);
  moviesTop20 = Array<MovieDataModel>(0);
  titles_moviesTop20 = Array<string>(0);
  alive = true;

  constructor(private filmBackendService: FilmBackendService) {
  }

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
          this.moviesAll = <Array<MovieDataModel>>res.data.movies;
          const _moviesTop20 = this.moviesAll.filter((movie) => {
              return movie.ranking < 21;
          });
          _moviesTop20.forEach((movie) => {
              movie.directors.forEach((director) => {
                director.sanitizeDirectorUrl = 'https://www.imdb.com/find?q=' + director.name.split(' ').join('%20') + '&s=nm&ref_=fn_nm';
              });
          });
          this.moviesTop20 = _moviesTop20;
          console.log(this.moviesTop20);
          this.moviesTop20.forEach((movie) => {
              this.titles_moviesTop20.push(movie.title.split(' ').join('%20'));
          });
          console.log(this.titles_moviesTop20);

          this.loadTrailers(this.titles_moviesTop20);
        },
        (res: any) => {
          this.loading = false;
          this.loadingMessage = '';
          this.errorMessage = 'There are server problems... ' + res.message;
          console.log(res);
        });
  }

  async loadTrailers(titles: Array<string>) {
    const results = [];
    const _trailers = [];

    for (const title of titles) {
      results.push(await this.filmBackendService.getTrailerOfFilm(title));
    }

    results.forEach((result, i) => {
      if (result.data && result.data.movies && result.data.movies['0'].trailer) {
        this.trailers.push({
          idIMDB: this.moviesTop20[i].idIMDB,
          trailer: result
        });
      }
    });
    console.log(this.trailers);
  }

  public openInNewWindow(url: string) {
    window.open(url, '_blank');
  }

  public closeAlert() {
    this.errorMessage = '';
  }
}
