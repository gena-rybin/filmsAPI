import {Injectable} from '@angular/core';
import {TOKEN} from '../const/film.constants';
import {Observable} from 'rxjs/Observable';
import {FilmJsonpService} from './film-jsonp.service';

@Injectable()
export class FilmBackendService {

  private token = TOKEN;

  constructor(private filmJsonpService: FilmJsonpService) { }

  public getListOfFilms(startDate: string, endDate: string): Observable<any> {
    const url = `http://api.myapifilms.com/imdb/top?start=` + startDate + `&end=`
                + endDate + `&token=` + this.token + `&format=json&data=1`;
    console.log(url);
    return this.filmJsonpService.getRequestUsingJSONP(url);
  }

  public getTrailerOfFilm(title: string): Observable<any> {
    const url = `http://api.myapifilms.com/imdb/idIMDB?title=` + title + `&token=` + this.token
              + `&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=2&exactFilter=0`
              + `&limit=1&forceYear=0&trailers=1&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=0&biography=0`
              + `&uniqueName=0&filmography=0&bornAndDead=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=0`
              + `&adultSearch=0&goofs=0&keyword=0&quotes=0&fullSize=0&companyCredits=0&filmingLocations=0`;

    console.log(url);
    return this.filmJsonpService.getRequestUsingJSONP(url);
  }

}
