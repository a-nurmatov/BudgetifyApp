import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './account/services/account.service';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private accountService: AccountService
  ) {
    this.watchUserInteraction();
  }

  get isLoggedIn(): boolean {
    return (
      this.authService.isLoggedIn() &&
      this.location.path() !== '/login' &&
      this.location.path() !== '/login-redirect'
    );
  }

  get isCategoryPage(): boolean {
    return this.location.path() !== '/categories';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  watchUserInteraction(): void {
    window.addEventListener('click', (event) => {
      if (localStorage.getItem('expiresIn') && localStorage.getItem('token')) {
        localStorage.setItem('expiresIn', String(Date.now() + 3600000));
      }
    });
  }
}
