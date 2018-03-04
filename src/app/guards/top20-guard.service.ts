import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {CommonDataService} from '../services/common-data.service';

@Injectable()
export class Top20Guard implements CanActivate {

  constructor(public router: Router,
              public commonDataService: CommonDataService) {}

  canActivate() {

    if (this.commonDataService.moviesTop20.length > 0) {
      return true;
    }
    return false;
  }
}
