import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

const routesConfiguration: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login',
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: AppLayoutComponent,
    children: [
      {
        path: 'app',
        loadChildren: () =>
          import('src/app/modules/home/home.module').then((m) => m.HomeModule),
      },
    ],
  },
  {
    path: 'auth',
    canActivate: [],
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('src/app/modules/auth/auth.module').then((m) => m.AuthModule),
  },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: 'auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routesConfiguration)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
