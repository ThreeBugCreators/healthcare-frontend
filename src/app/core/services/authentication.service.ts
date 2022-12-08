import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const AccessTokenKey = 'auth-token';
const RefreshTokenKey = 'auth-refreshtoken';
const UserKey = 'user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      this.getUserFromLocalStorage() as User
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getUserFromLocalStorage(): any {
    let user: Object = {};
    let accessToken = '';
    let refreshToken = '';

    try {
      user = JSON.parse(localStorage.getItem('user') || '');
      accessToken = localStorage.getItem(AccessTokenKey) || '';
      refreshToken = localStorage.getItem(RefreshTokenKey) || '';

      return {
        accessToken,
        refreshToken,
        ...user,
      };
    } catch (error) {
      return null;
    }
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
          const { refreshToken, accessToken, ...userData } = data;

          localStorage.setItem(UserKey, JSON.stringify(userData));
          localStorage.setItem(AccessTokenKey, accessToken);
          localStorage.setItem(RefreshTokenKey, refreshToken);

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
      }
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next({} as User);
  }

  isSingedIn(): boolean {
    try {
      const user = JSON.parse(localStorage.getItem(UserKey) || '');
      const accessToken = localStorage.getItem(AccessTokenKey);
      const refreshToken = localStorage.getItem(RefreshTokenKey);

      if (user && accessToken && refreshToken) {
        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  refreshToken(refreshToken: string) {
    return this.http.post(
      `${environment.apiGatewayUrl}/api/v1/auth/refresh-token`,
      {
        refreshToken,
      },
      httpOptions
    );
  }
}
