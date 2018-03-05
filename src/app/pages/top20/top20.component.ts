import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilmBackendService} from '../../services/film-backend.service';
import 'rxjs/add/operator/takeWhile';
import {TrailerDataModel} from '../../models/trailer-data.model';
import {MovieDataModel} from '../../models/movie-data.model';
import {CommonDataService} from '../../services/common-data.service';
import {TOP20} from '../../const/film.constants';
import * as trailersJSON from '../../const/trailers.json';

@Component({
  selector: 'f-top20',
  templateUrl: './top20.component.html',
  styleUrls: ['./top20.component.css']
})
export class Top20Component implements OnInit, OnDestroy {
  loading = false;
  errorMessage = '';
  loadingMessage = '';
  // trailer: any;
  trailers = Array<{ 'idIMDB': string, 'trailer': TrailerDataModel }>(0);
  _trailers: any;
  moviesAll = Array<MovieDataModel>(0);
  moviesTop20 = Array<MovieDataModel>(0);
  favoriteMovies = Array<MovieDataModel>(0);
  favoriteID = Array<string>(0);
  titles_moviesTop20 = Array<string>(0);
  radio_values = [
    { value: 'json', description: 'json' },
    { value: 'server', description: 'server' }
  ];
  trailers_source = 'json';
  alive = true;
  private top20 = TOP20;

  constructor(private filmBackendService: FilmBackendService,
              private commonDataService: CommonDataService) {
  }

  ngOnInit() {
    // console.log(trailersJSON);
    this._trailers = trailersJSON;
    if (!(this.commonDataService.moviesTop20.length === this.top20
        && this.commonDataService.moviesAll.length
        && this.commonDataService.titles_moviesTop20.length === this.top20)) {
      this.getListOfMoviesFunction();
    } else {
      this.moviesTop20 = this.commonDataService.moviesTop20;
      this.moviesAll = this.commonDataService.moviesAll;
      this.titles_moviesTop20 = this.commonDataService.titles_moviesTop20;
      // console.log(this.moviesTop20);
    }
    if (!(this.commonDataService.trailers.length === this.top20)
        && (this.titles_moviesTop20.length === this.top20)) {
      this.trailersSourceChanged();
    } else {
      this.trailers = this.commonDataService.trailers;
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  public trailersSourceChanged() {
    // console.log(this.trailers_source);
    switch (this.trailers_source) {
      case 'json':
        this.trailers = [];
        this.moviesTop20.forEach((movie, i) => {
          const trailerArray = this._trailers.filter((trailer) => {
            return trailer.idIMDB === movie.idIMDB;
          });
          this.trailers.push(trailerArray['0']);
        });
        break;
      case 'server':
        this.trailers = [];
        this.loadTrailers(this.titles_moviesTop20);
        break;
      default:
        break;
    }
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
          // console.log(res);
          if (res.data && res.data.movies) {
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
            // console.log(this.titles_moviesTop20);

            this.trailersSourceChanged();
          } else {
            this.errorMessage = 'Sorry... ' + res.error.message;
            this.moviesTop20 = [];
            this.trailers = [];
            this.commonDataService.moviesTop20 = [];
            this.commonDataService.trailers = [];
            this.commonDataService.moviesAll = [];
          }
        },
        (res: any) => {
          this.loading = false;
          this.loadingMessage = '';
          this.errorMessage = 'There are server problems... ' + res.message;
          // console.log(res);
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
      }
    });
    this.commonDataService.trailers = this.trailers;
    console.log(this.trailers);
  }

  public openInNewWindow(url: string) {
    window.open(url, '_blank');
  }

  public closeAlert() {
    this.errorMessage = '';
  }
}
