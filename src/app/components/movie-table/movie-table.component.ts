import {Component, Input, OnInit} from '@angular/core';
import {MovieDataModel} from '../../models/movie-data.model';
import {CommonDataService} from '../../services/common-data.service';
import {TrailerDataModel} from '../../models/trailer-data.model';

@Component({
  selector: 'f-movie-table',
  templateUrl: './movie-table.component.html',
  styleUrls: ['./movie-table.component.css']
})
export class MovieTableComponent implements OnInit {
  favoriteMovies = Array<MovieDataModel>(0);
  favoriteID = Array<string>(0);
  moviesTop20: Array<MovieDataModel>;

  @Input() set _moviesTop20(data: Array<MovieDataModel>) {
    this.moviesTop20 = data;
    console.log(this.moviesTop20);
  }
  @Input() displayFullView: boolean;
  @Input() trailers: Array<{ 'idIMDB': string, 'trailer': TrailerDataModel }>;

  constructor(private commonDataService: CommonDataService) { }

  ngOnInit() {
    this.favoriteID = JSON.parse(localStorage.getItem('favoriteID')) || [];
    this.favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
  }

  public isFavouriteMovie(idIMDB: string): boolean {
    return (this.favoriteID) ? (this.favoriteID.indexOf(idIMDB) !== -1) : false;
  }

  toggleFavoriteMovie(idIMDB: string) {
    if (this.isFavouriteMovie(idIMDB)) {
      const i = this.favoriteID.indexOf(idIMDB);
      console.log(i);
      this.favoriteID.splice(i, 1);
      this.favoriteMovies.splice(i, 1);
      this.saveFavouriteToLocalStorage(this.favoriteID, this.favoriteMovies);
    } else {
      this.favoriteID.push(idIMDB);
      this.moviesTop20.forEach((movie, i) => {
        if (movie.idIMDB === idIMDB) {
          this.favoriteMovies.push(movie);
        }
      });
      this.saveFavouriteToLocalStorage(this.favoriteID, this.favoriteMovies);
    }
  }
  saveFavouriteToLocalStorage(favoriteID: Array<string>, favoriteMovies: Array<MovieDataModel>) {
    this.commonDataService.favoriteID = favoriteID;
    this.commonDataService.favoriteMovies = favoriteMovies;
    localStorage.removeItem('favoriteID');
    localStorage.removeItem('favoriteMovies');
    localStorage.setItem('favoriteID', JSON.stringify(this.favoriteID));
    localStorage.setItem('favoriteMovies', JSON.stringify(this.favoriteMovies));
  }

  public openInNewWindow(url: string) {
    window.open(url, '_blank');
  }

}
