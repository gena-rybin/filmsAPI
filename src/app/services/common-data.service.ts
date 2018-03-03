import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MovieDataModel} from '../models/movie-data.model';

@Injectable()
export class CommonDataService {
  private _moviesTop20 = Array<MovieDataModel>(0);

  constructor() { }

  get moviesTop20(): Array<MovieDataModel> {
    return this._moviesTop20;
  }

  set moviesTop20(value: Array<MovieDataModel>) {
    this._moviesTop20 = value;
    console.log('---> moviesTop20 setted');
  }

}
