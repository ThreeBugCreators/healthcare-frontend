import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageHelper } from 'src/app/core/helpers/local-storage.helper';
import { AuthenticationService } from 'src/app/core/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  srcAvatar: string = ''
  shouldDisplayDropdownContent: boolean = false;
  currentUser: any;
  localStorageUserSubscription!: Subscription;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnDestroy(): void {
    this.localStorageUserSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.localStorageUserSubscription = LocalStorageHelper.getCurrentUser()
      .subscribe((data) => {
        if (data && data.name) {
          this.currentUser = data;
        }
      });
  }

  handleAvatarClick() {

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  switchDropdown() {
    this.shouldDisplayDropdownContent = !this.shouldDisplayDropdownContent;
  }
}
