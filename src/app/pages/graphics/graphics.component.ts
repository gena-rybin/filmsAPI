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
  chart = []; // : Chart;
  chartData_labels = [];
  chartData_data = [];
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
      console.log('moviesTop20 exist');
      setTimeout(_ => this.prepareChartData(this.moviesTop20));
      // this.prepareChartData(this.moviesTop20);
    } else {
      this.getListOfMoviesFunction();
    }
  }

  ngAfterViewInit() {
    // setTimeout(_ => this.runChart());
  }
  ngOnDestroy() {
    this.alive = false;
  }

  public runChart() {
    console.log('run runChart');
    const elem = document.getElementById('myChart');

    console.log(elem);
    console.log(this.chartData_labels);
    console.log(this.chartData_data);

    this.chart = new Chart(elem, {
      type: 'bar',
      data: {
        labels: this.chartData_labels,
        datasets: [{
          label: '# of Votes',
          data: this.chartData_data,
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
    console.log(this.chart);
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

          this.moviesTop20.forEach((movie) => {
            this.titles_moviesTop20.push(movie.title.split(' ').join('%20'));
          });
          this.commonDataService.titles_moviesTop20 = this.titles_moviesTop20;

          this.prepareChartData(this.commonDataService.moviesTop20);
        },
        (res: any) => {
          this.loading = false;
          this.loadingMessage = '';
          this.errorMessage = 'There are server problems... ' + res.message;
          console.log(res);
        });
  }

  public prepareChartData(moviesTop20: Array<any>) {
    const years = [];
    console.log('run prepareChartData');
    moviesTop20.forEach((movie) => {
      years.push(+movie.year);
    });
    years.sort((first, second) => {
      return first - second;
    });
    // const years = [1934, 1957, 1966, 1972, 1974, 1975, 1977, 1980, 1990, 1993, 1994, 1994, 1994, 1999, 1999, 2001, 2002, 2003, 2008, 2010];
    const yMin = years['0'];
    const yMax = years[years.length - 1];
    const periodsStart = (Math.floor(yMin / 10)) * 10;
    const periodsEnd = ((Math.floor((yMax) / 10 ) + 1) * 10);
    const length = (periodsEnd - periodsStart) / 10;
    const chartData = [];
    let currentPeriodStart = periodsStart;
    let currentPeriodEnd = periodsStart + 9;

    for (let i = 0; i < length; i++) {
      const validYears = years.filter((year) => (year >= currentPeriodStart && year <= currentPeriodEnd));
      const period = '' + currentPeriodStart + '-' + currentPeriodEnd;
      this.chartData_labels.push(period);
      this.chartData_data.push(validYears.length);
      currentPeriodStart += 10;
      currentPeriodEnd += 10;
    }
    console.log(years);
    console.log(periodsStart, yMin, yMax, periodsEnd);
    this.runChart();
  }

  public closeAlert() {
    this.errorMessage = '';
  }

}
