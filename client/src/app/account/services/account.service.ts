import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { AccountInterface } from '../types/account.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  accounts: AccountInterface[] = [];
  accountsUpdated = new Subject<AccountInterface[]>();

  constructor(private http: HttpClient) {}

  addNewAccount(
    userId: string | null,
    title: string,
    currency: string,
    description: string
  ) {
    return this.http
      .post<{ message: string; newAccount: AccountInterface }>(
        'http://localhost:5000/accounts',
        {
          userId,
          title,
          currency,
          description,
        }
      )
      .pipe(
        tap(() => {
          this.accounts.push({
            title,
            currency,
            description,
            userId,
            balance: 0,
          });
          this.accountsUpdated.next([...this.accounts]);
        })
      );
  }

  requestUserAccounts(userId: string | null) {
    return this.http
      .get<{ message: string; accounts: AccountInterface[] }>(
        `http://localhost:5000/accounts/${userId}`
      )
      .subscribe((data) => {
        this.accounts = data.accounts;
        this.accountsUpdated.next([...this.accounts]);
        console.log(data);
      });
  }

  getUserAccounts() {
    return this.accountsUpdated.asObservable();
  }
}
