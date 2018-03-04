import { Component, OnInit } from '@angular/core';
import {MovieDataModel} from '../../models/movie-data.model';
import {CommonDataService} from '../../services/common-data.service';

@Component({
  selector: 'f-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  moviesTop20 = Array<MovieDataModel>(0);
  favoriteMovies = Array<MovieDataModel>(0);

  constructor(public commonDataService: CommonDataService) { }

  ngOnInit() {
    this.commonDataService.favoriteID = JSON.parse(localStorage.getItem('favoriteID'));
    this.commonDataService.favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies'));
  }

}
