import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Budgetify';
  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {
    window.addEventListener('click', (event) => {
      if (localStorage.getItem('expiresIn') && localStorage.getItem('token')) {
        localStorage.setItem('expiresIn', String(Date.now() + 3600000));
      }
    });
  }

  get isLoggedIn() {
    return (
      this.authService.isLoggedIn() &&
      this.location.path() !== '/login' &&
      this.location.path() !== '/login-redirect'
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
