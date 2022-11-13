import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { throwIfAlreadyLoaded } from './guards/module-import.guard';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthPageGuard } from './guards/auth-page.guard';
import { LoginGuard } from './guards/login.guard';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AuthGuard,
    AuthPageGuard,
    LoginGuard,
    NoAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
