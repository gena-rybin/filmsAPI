import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FilmJsonpService {

  constructor(private httpClient: HttpClient) { }

  public getRequestUsingJSONP(url: string): Observable<any> {
    const _url = url + `&callback=JSONP_CALLBACK`;

    return this.httpClient.jsonp(_url, 'callback');
  }

}
