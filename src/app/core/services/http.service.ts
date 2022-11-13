import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    headers: any;
  }) {
    headers = {
      ...headers,
      ...this.initHeaders(),
    };

    return this.http
      .post(url, data, { headers })
      .toPromise();
  }

  get({
    url,
    queryParams,
    headers = {},
  }: {
    url: string;
    queryParams?: Object;
    headers?: any;
  }) {
    headers = {
      ...headers,
      ...this.initHeaders(),
    };

    return this.http
      .post(`${url + this.serialize(queryParams)}`, { headers })
      .toPromise();
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
