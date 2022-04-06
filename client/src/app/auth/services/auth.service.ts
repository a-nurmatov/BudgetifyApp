import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserData } from '../types/userData.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<UserData> {
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
  }

  healthCheck(): Observable<any> {
    return this.http.post('http://localhost:5000/api/health-check', {
      test: 'test',
    });
  }

  private setSession(res: UserData): void {
    const expiresIn = Date.now() + Number(res.user.expiresIn);
    localStorage.setItem('token', res.user.token);
    localStorage.setItem('expiresIn', expiresIn.toString());
  }
}
