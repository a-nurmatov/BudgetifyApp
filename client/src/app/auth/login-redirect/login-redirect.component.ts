import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrls: ['./login-redirect.component.scss'],
})
export class LoginRedirectComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onLogin(): void {
    this.router.navigate(['/login']);
  }
}
