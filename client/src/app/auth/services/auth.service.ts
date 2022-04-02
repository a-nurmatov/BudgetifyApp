import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post('http://localhost:5000/users/login', { email, password })
      .pipe(tap((res: any) => this.setSession(res)));
  }

  isLoggedIn() {
    const expiresIn = localStorage.getItem('expiresIn');
    if (expiresIn) {
      return Date.now() < Number(expiresIn);
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
  }

  healthCheck() {
    console.log('hello health check');
    return this.http.post('http://localhost:5000/api/health-check', {
      test: 'test',
    });
  }

  private setSession(res: any) {
    const expiresIn = Date.now() + Number(res.user.expiresIn);
    localStorage.setItem('token', res.user.token);
    localStorage.setItem('expiresIn', expiresIn.toString());
  }
}
