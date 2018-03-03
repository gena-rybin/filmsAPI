import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import {CommonDataService} from '../../services/common-data.service';
import {MovieDataModel} from '../../models/movie-data.model';
import {FilmBackendService} from '../../services/film-backend.service';
import {TOP20} from '../../const/film.constants';

@Component({
  selector: 'f-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit, AfterViewInit, OnDestroy {
  loading = false;
  errorMessage = '';
  loadingMessage = '';
  chart = [];
  moviesTop20 = Array<MovieDataModel>(0);
  moviesAll = Array<MovieDataModel>(0);
  titles_moviesTop20 = Array<string>(0);
  alive = true;
  private top20 = TOP20;

  constructor(private commonDataService: CommonDataService,
              private filmBackendService: FilmBackendService) { }

  ngOnInit() {
    if (this.commonDataService.moviesTop20.length) {
      this.moviesTop20 = this.commonDataService.moviesTop20;
      console.log(this.moviesTop20);
    } else {
      this.getListOfMoviesFunction();
    }
  }

  ngAfterViewInit() {
    setTimeout(_ => this.runChart());
  }
  ngOnDestroy() {
    this.alive = false;
  }

  public runChart() {
    const elem = document.getElementById('myChart');

    console.log(elem);

    this.chart = new Chart(elem, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
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
          // console.log(this.moviesTop20);
          this.moviesTop20.forEach((movie) => {
            this.titles_moviesTop20.push(movie.title.split(' ').join('%20'));
          });
          this.commonDataService.titles_moviesTop20 = this.titles_moviesTop20;
          // console.log(this.titles_moviesTop20);
        },
        (res: any) => {
          this.loading = false;
          this.loadingMessage = '';
          this.errorMessage = 'There are server problems... ' + res.message;
          console.log(res);
        });
  }

  public closeAlert() {
    this.errorMessage = '';
  }

}
