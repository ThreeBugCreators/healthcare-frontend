import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthenticationService } from '../services';
import { TokenStorageService } from '../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthenticationService,
    private tokenService: TokenStorageService
  ) {}

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): any {
    if (this.authService.isSingedIn()) {
      const currentUserData: any = this.authService.currentUserValue;

      request = request.clone({
        headers: request.headers
          .append('refresh-token', currentUserData.refreshToken)
          .append('access-token', currentUserData.accessToken),
      });

      return next.handle(request).pipe(
        catchError((err: any, caught: Observable<any>) => {
          if (err.status == 401 && err instanceof HttpErrorResponse) {
            return this.handle401Error(request, next);
          }
          return throwError(() => new Error(err));
        })
      );
    }

    return next.handle(request)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this.tokenService.getRefreshToken();

      if (token)
        return this.authService.refreshToken(token).pipe(
          switchMap((dataToken: any) => {
            const { data: accessToken } = dataToken;

            this.isRefreshing = false;
            this.tokenService.saveToken(accessToken);

            return next.handle(this.addTokenHeader(request, accessToken, token));
          }),
          catchError((err) => throwError(() => err))
        );
    }

    return throwError(() => new Error('Login required'));
  }

  addTokenHeader(
    request: HttpRequest<any>,
    accessToken: string,
    refreshToken: string,
  ): HttpRequest<any> {
    return request.clone({
      headers: request.headers
        .append('refresh-token', refreshToken)
        .append('access-token', accessToken),
    })
  }
}