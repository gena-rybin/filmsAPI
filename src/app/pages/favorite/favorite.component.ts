import { Component, OnInit } from '@angular/core';
import {MovieDataModel} from '../../models/movie-data.model';

@Component({
  selector: 'f-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  moviesTop20 = Array<MovieDataModel>(0);
  favoriteMovies = Array<MovieDataModel>(0);
  // favoriteID = Array<string>(0);

  constructor() { }

  ngOnInit() {
    // this.favoriteID = JSON.parse(localStorage.getItem('favoriteID'));
    this.favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies'));
    this.moviesTop20 = this.favoriteMovies;
  }

}
