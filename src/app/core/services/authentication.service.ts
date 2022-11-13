import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>({} as User);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  initHeaders() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('App-Name', environment.appName);
    return headers;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(
        `${environment.apiGatewayUrl}/api/v1/auth/login`,
        { username, password },
        {
          headers: this.initHeaders(),
        }
      )
      .pipe(
        map((loginData) => {
          const { data } = loginData;
          localStorage.setItem('user', JSON.stringify(data));
          this.currentUserSubject.next(data);
          return data;
        })
      );
  }

  register(user: User) {
    const { username, password, email, name, surname } = user;

    return this.http.post<any>(
      `${environment.apiGatewayUrl}/api/v1/auth/register`,
      {
        username,
        password,
        email,
        name,
        surname,
      },
      {
        headers: this.initHeaders(),
      },
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next({} as User);
  }

  isSingedIn(): boolean {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '');

      if (user) {
        const { accessToken, refreshToken } = user;

        if (accessToken && refreshToken) {
          return true;
        }
      }

      return false;
    } catch (error) {
      return false;
    }
  }
}
