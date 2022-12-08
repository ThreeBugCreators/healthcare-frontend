// Angular library
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

// npm library
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class AuthPageGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser: any = this.authenticationService.currentUserValue;
        const {
            refreshToken,
            accessToken,
        } = currentUser;

        if (refreshToken && accessToken) {
            this.router.navigate(['/app'], { queryParams: { returnUrl: state.url } });
            return false;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}