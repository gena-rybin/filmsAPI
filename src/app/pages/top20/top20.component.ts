import {Component, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FilmBackendService} from '../../services/film-backend.service';
import 'rxjs/add/operator/takeWhile';
import {TrailerDataModel} from '../../models/trailer-data.model';
import {MovieDataModel} from '../../models/movie-data.model';
import {toPromise} from 'rxjs/operator/toPromise';
import {async} from '@angular/core/testing';
import {CommonDataService} from '../../services/common-data.service';
import {TOP20} from '../../const/film.constants';

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
  favoriteMovies = Array<MovieDataModel>(0);
  favoriteID = Array<string>(0);
  titles_moviesTop20 = Array<string>(0);
  alive = true;
  private top20 = TOP20;

  constructor(private filmBackendService: FilmBackendService,
              private commonDataService: CommonDataService) {
  }

  ngOnInit() {
    this.favoriteID = JSON.parse(localStorage.getItem('favoriteID'));
    this.favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies'));

    if (!(this.commonDataService.moviesTop20.length
        && this.commonDataService.moviesAll.length
        && this.commonDataService.titles_moviesTop20.length)) {
      this.getListOfMoviesFunction();
    } else {
      this.moviesTop20 = this.commonDataService.moviesTop20;
      this.moviesAll = this.commonDataService.moviesAll;
      this.titles_moviesTop20 = this.commonDataService.titles_moviesTop20;
    }
    if (!(this.commonDataService.trailers.length === this.top20)) {
      this.loadTrailers(this.titles_moviesTop20);
    } else {
      this.trailers = this.commonDataService.trailers;
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  public getListOfMoviesFunction() {
    this.loading = true;
    this.errorMessage = '';
    this.loadingMessage = 'Please wait, data loading...';
    this.filmBackendService.getListOfFilms('1900', '2017')
      .takeWhile(() => this.alive)
      .subscribe(
        (res: any) => {

          this.loading = false;
          this.loadingMessage = '';
          console.log(res);
          this.moviesAll = (res.data && <Array<MovieDataModel>>res.data.movies) ? <Array<MovieDataModel>>res.data.movies : undefined;
          this.commonDataService.moviesAll = this.moviesAll;

          const _moviesTop20 = this.moviesAll.filter((movie) => {
              return movie.ranking <= this.top20;
          });
          _moviesTop20.forEach((movie) => {
              movie.directors.forEach((director) => {
                director.sanitizeDirectorUrl = 'https://www.imdb.com/find?q=' + director.name.split(' ').join('%20') + '&s=nm&ref_=fn_nm';
              });
          });
          this.moviesTop20 = _moviesTop20;
          this.commonDataService.moviesTop20 = this.moviesTop20;
          console.log(this.moviesTop20);
          this.moviesTop20.forEach((movie) => {
              this.titles_moviesTop20.push(movie.title.split(' ').join('%20'));
          });
          this.commonDataService.titles_moviesTop20 = this.titles_moviesTop20;
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
          trailer: result.data.movies['0'].trailer
        });
        // trailer: result.trailer.data.movies['0']
      }
    });
    this.commonDataService.trailers = this.trailers;
    console.log(this.trailers);
  }

  public openInNewWindow(url: string) {
    window.open(url, '_blank');
  }

  public isFavouriteMovie(idIMDB: string): boolean {
    return (this.favoriteID.indexOf(idIMDB) !== -1);
   }

  toggleFavoriteMovie(idIMDB: string) {
    if (this.isFavouriteMovie(idIMDB)) {
      const i = this.favoriteID.indexOf(idIMDB);
      console.log(i);
      this.favoriteID.splice(i, 1);
      this.favoriteMovies.splice(i, 1);
      this.saveFavouriteToLocalStorage();
    } else {
      this.favoriteID.push(idIMDB);
      this.moviesTop20.forEach((movie, i) => {
        if (movie.idIMDB === idIMDB) {
          this.favoriteMovies.push(movie);
        }
      });
      this.saveFavouriteToLocalStorage();
    }
  }
  saveFavouriteToLocalStorage() {
    this.commonDataService.favoriteID = this.favoriteID;
    this.commonDataService.favoriteMovies = this.favoriteMovies;
    localStorage.removeItem('favoriteID');
    localStorage.removeItem('favoriteMovies');
    localStorage.setItem('favoriteID', JSON.stringify(this.favoriteID));
    localStorage.setItem('favoriteMovies', JSON.stringify(this.favoriteMovies));
  }

  public closeAlert() {
    this.errorMessage = '';
  }
}
