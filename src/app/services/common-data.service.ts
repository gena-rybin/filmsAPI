import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MovieDataModel} from '../models/movie-data.model';
import {TrailerDataModel} from '../models/trailer-data.model';

@Injectable()
export class CommonDataService {
  private _moviesAll = Array<MovieDataModel>(0);
  private _moviesTop20 = Array<MovieDataModel>(0);
  private _titles_moviesTop20 = Array<string>(0);
  private _trailers = Array<{ 'idIMDB': string, 'trailer': TrailerDataModel }>(0);
  _favoriteMovies = Array<MovieDataModel>(0);
  _favoriteID = Array<string>(0);

  constructor() { }

  set moviesAll(value: Array<MovieDataModel>) {
    this._moviesAll = value;
    console.log('---> moviesAll setted');
  }

  get moviesAll(): Array<MovieDataModel> {
    return this._moviesAll;
  }

  set moviesTop20(value: Array<MovieDataModel>) {
    this._moviesTop20 = value;
    console.log('---> moviesTop20 setted');
  }

  get moviesTop20(): Array<MovieDataModel> {
    return this._moviesTop20;
  }

  set titles_moviesTop20(value: Array<string>) {
    this._titles_moviesTop20 = value;
    console.log('---> titles_moviesTop20 setted');
  }

  get titles_moviesTop20(): Array<string> {
    return this._titles_moviesTop20;
  }

  set trailers(value: Array<{ 'idIMDB': string, 'trailer': TrailerDataModel }>) {
    this._trailers = value;
    console.log('---> trailers setted');
  }

  get trailers(): Array<{ 'idIMDB': string, 'trailer': TrailerDataModel }> {
    return this._trailers;
  }

  set favoriteID(value: Array<string>) {
    this._favoriteID = value;
    console.log('---> favoriteID setted');
  }

  get favoriteID(): Array<string> {
    return this._favoriteID;
  }

  set favoriteMovies(value: Array<MovieDataModel>) {
    this._favoriteMovies = value;
    console.log('---> avoriteMovies setted');
  }

  get favoriteMovies(): Array<MovieDataModel> {
    return this._favoriteMovies;
  }



}
