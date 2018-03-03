import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import {CommonDataService} from '../../services/common-data.service';
import {MovieDataModel} from '../../models/movie-data.model';

@Component({
  selector: 'f-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit, AfterViewInit {
  chart = [];
  moviesTop20 = Array<MovieDataModel>(0);

  constructor(private commonDataService: CommonDataService) { }

  ngOnInit() {
    this.moviesTop20 = this.commonDataService.moviesTop20;
    console.log(this.moviesTop20);
  }

  ngAfterViewInit() {
    setTimeout(_ => this.runChart());
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

}
