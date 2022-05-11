import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrls: ['./login-redirect.component.scss'],
})
export class LoginRedirectComponent {
  constructor(private router: Router) {}

  onLogin(): void {
    this.router.navigate(['/login']);
  }
}
