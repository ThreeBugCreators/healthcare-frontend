import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthenticationService } from '../services';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthenticationService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isSingedIn()) {
      const currentUserData: any = this.authService.currentUserValue;
  
      request = request.clone({
        headers: request.headers
          .append('refresh-token', currentUserData.refreshToken)
          .append('access-token', currentUserData.accessToken),
      });
    }
    return next.handle(request);
  }
}
