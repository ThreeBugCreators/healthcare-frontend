import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}

  initHeaders() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('App-Name', environment.appName);
    return headers;
  }

  post({
    url,
    data,
    headers = {},
  }: {
    url: string;
    data: Object;
    headers?: any;
  }) {
    return this.http
      .post(url, data, { headers: this.initHeaders() })
      .pipe(retry(1), catchError(this.handleError));
  }

  get({
    url,
    queryParams = {},
    headers = {},
  }: {
    url: string;
    queryParams?: Object;
    headers?: any;
  }) {
    headers = this.initHeaders();
    return this.http
      .get(`${url}?${this.serialize(queryParams)}`, { headers })
      .pipe(
        map(d => {
          return d;
        }),
        retry(1),
        catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }

  serialize(queryParams: any) {
    const str = [];
    for (const param in queryParams)
      if (queryParams.hasOwnProperty(param)) {
        str.push(
          encodeURIComponent(param) +
            '=' +
            encodeURIComponent(queryParams[param])
        );
      }
    return str.join('&');
  }
}
