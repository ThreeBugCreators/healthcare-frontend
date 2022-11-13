import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  srcAvatar: string = ''
  shouldDisplayDropdownContent: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

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
