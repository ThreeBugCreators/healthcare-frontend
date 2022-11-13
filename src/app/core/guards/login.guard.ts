import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import isEmpty from 'lodash/isEmpty';
import { AuthenticationService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenService: AuthenticationService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      console.log('Here');
      if (this.authenService.isSingedIn()) {
        console.log('Cannot');
        this.router.navigate(['/app']); // or home
        return false;
      }
      console.log('Can');
      return true;
    }
}
