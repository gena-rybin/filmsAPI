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
  trailers = Array<TrailerDataModel>(0);
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
      // .takeWhile(() => this.alive)
      .then(
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
          // const promises = [];

          // this.titles_moviesTop20.forEach((title) => {
          //   const promise = new Promise(resolve => {
          //     this.getTrailerOfFilmFunction(title);
          //   });
          //   promises.push(promise);
          // });

          return this.titles_moviesTop20;
          // console.log(promises);

          // Promise.all(promises)
          //   .then(data => {
          //     console.log(data);
          //     // return data.map(entry => entry * 10);
          //   });

        },
        (res: any) => {
          this.loading = false;
          this.loadingMessage = '';
          this.errorMessage = 'There are server problems... ' + res.message;
          console.log(res);
        }
      ).then((titles: Array<string>) => {
      this.loadTrailers(titles);
    });
  }

  async loadTrailers(titles: Array<string>) {
    // const arr = [Promise.resolve(1),
    //             new Promise(resolve => setTimeout(() => resolve(2), 3000)),
    //             Promise.resolve(3), Promise.resolve(4)];
    // for (let i = 0; i < arr.length; i++) {
    //   let _res = await arr[i];
    //   console.log(_res);
    // }

    // const titltesLength = 5;
    // const promises = [];
    // for (let i = 0; i < titles.length; i++){
    //   promises.push(await this.filmBackendService.getTrailerOfFilm(titles[i]));
    // }
    const results = [
      await this.filmBackendService.getTrailerOfFilm(titles['0']),
      // await this.filmBackendService.getTrailerOfFilm(titles['1']),
      await this.filmBackendService.getTrailerOfFilm(titles['2'])
    ];
    results.forEach((result) => {
      if (result.data && result.data.movies && result.data.movies['0'].trailer) {
        this.trailers.push(result.data.movies['0'].trailer);
      }
    });
    console.log(this.trailers);
    }

  public getTrailerOfFilmFunction(title: any) {
    this.filmBackendService.getTrailerOfFilm(title)
      .then(
        (res: any) => {
          this.trailers.push(res.data.movies['0'].trailer);

          // const trailer = (res.data && res.data.movies && res.data.movies['0'].trailer)
          //                 ? (<TrailerDataModel>res.data.movies['0'].trailer)
          //                 : new TrailerDataModel(undefined, undefined, [], undefined, undefined);
          // return trailer;
        },
        (res: any) => {
          console.log(res);
          // return new TrailerDataModel(undefined, undefined, [], undefined, undefined);
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
