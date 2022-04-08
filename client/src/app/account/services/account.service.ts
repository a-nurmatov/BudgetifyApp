import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  addNewAccount(title: string, currency: string, description: string) {
    return this.http.post('http://localhost:5000/accounts', {
      title,
      currency,
      description,
    });
  }
}
