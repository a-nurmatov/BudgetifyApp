import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserDataInterface } from '../types/userData.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<UserDataInterface> {
    return this.http
      .post('http://localhost:5000/users/login', { email, password })
      .pipe(tap((res: any) => this.setSession(res)));
  }

  isLoggedIn(): boolean {
    const expiresIn = localStorage.getItem('expiresIn');
    if (expiresIn) {
      return Date.now() < Number(expiresIn);
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('country');
    localStorage.removeItem('userId');
  }

  healthCheck(): Observable<any> {
    return this.http.post('http://localhost:5000/api/health-check', {
      test: 'test',
    });
  }

  private setSession(res: UserDataInterface): void {
    const expiresIn = Date.now() + Number(res.user.expiresIn);
    localStorage.setItem('token', res.user.token);
    localStorage.setItem('expiresIn', expiresIn.toString());
    localStorage.setItem('country', res.user.country);
    localStorage.setItem('userId', res.user.id);
    localStorage.setItem('fullName', res.user.fullName);
  }
}
