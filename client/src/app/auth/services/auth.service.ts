import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { CategoryService } from 'src/app/category/services/category.service';
import { UserDataInterface } from '../types/userData.interface';

const defaultExpenseCategories = [
  'food',
  'transportation',
  'housing',
  'shopping',
  'education',
  'kids',
  'entertainment',
  'health and beauty',
  'pet',
  'internet',
  'mobile',
];

const defaultIncomeCategories = [
  'salary',
  'gifts',
  'other',
  'rental income',
  'premium/bonuses',
];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) {}

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
    localStorage.removeItem('fullName');
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

    let userId = localStorage.getItem('userId');
    if (!localStorage.getItem('firstLogin')) {
      defaultExpenseCategories.map((title) => {
        let uniqueness = userId + title;
        this.categoryService
          .addNewCateogry(title, 'expense', userId, uniqueness)
          .pipe(take(1))
          .subscribe();
      });
      defaultIncomeCategories.map((title) => {
        let uniqueness = userId + title;
        this.categoryService
          .addNewCateogry(title, 'income', userId, uniqueness)
          .pipe(take(1))
          .subscribe();
      });
      localStorage.setItem('firstLogin', 'false');
    }
  }
}
