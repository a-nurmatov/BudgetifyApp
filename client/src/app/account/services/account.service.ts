import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { AccountInterface } from '../types/account.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accounts: AccountInterface[] = [];
  private accountsUpdated = new Subject<AccountInterface[]>();
  private activeAccount = new Subject<AccountInterface>();

  constructor(private http: HttpClient) {}

  addNewAccount(
    userId: string | null,
    title: string,
    currency: string,
    description: string
  ): Observable<{ message: string; newAccount: AccountInterface }> {
    return this.http
      .post<{ message: string; newAccount: AccountInterface }>(
        'http://localhost:5000/accounts',
        {
          userId,
          title,
          currency,
          description,
          uniqueness: userId + title,
        }
      )
      .pipe(
        tap((data) => {
          this.accounts.unshift(data.newAccount);
          this.accountsUpdated.next([...this.accounts]);
          this.setActiveAccount({ ...data.newAccount });
        })
      );
  }

  requestUserAccounts(
    userId: string | null
  ): Observable<{ message: string; accounts: AccountInterface[] }> {
    return this.http.get<{ message: string; accounts: AccountInterface[] }>(
      `http://localhost:5000/accounts/${userId}`
    );
  }

  setInitialData(accounts: AccountInterface[]): void {
    this.accounts = accounts;
    this.accountsUpdated.next([...accounts]);
    this.activeAccount.next({ ...accounts[0] });
  }

  getActiveAccount(): Observable<AccountInterface> {
    return this.activeAccount.asObservable();
  }

  setActiveAccount(account: AccountInterface): void {
    this.activeAccount.next({ ...account });
  }

  getUserAccounts(): Observable<AccountInterface[]> {
    return this.accountsUpdated.asObservable();
  }

  deleteAccount(accountId: string | undefined): Observable<any> {
    return this.http.delete(`http://localhost:5000/accounts/${accountId}`).pipe(
      tap(() => {
        if (this.accounts.length > 0) {
          this.accounts.find((item, index) => {
            if (item._id === accountId) {
              if (this.accounts[index - 1]) {
                this.setActiveAccount({ ...this.accounts[index - 1] });
              } else if (this.accounts[index + 1]) {
                this.setActiveAccount({ ...this.accounts[index + 1] });
              }
            }
          });
        }
        this.accounts = this.accounts.filter(
          (account) => account._id !== accountId
        );
        this.accountsUpdated.next([...this.accounts]);
      })
    );
  }

  updateAccount(account: AccountInterface): Observable<any> {
    let updatedAccount = { ...account };
    delete updatedAccount._id;
    return this.http
      .patch(`http://localhost:5000/accounts/${account._id}`, updatedAccount)
      .pipe(
        tap((data) => {
          this.accounts = this.accounts.map((acc) => {
            if (acc._id === account._id) {
              return { ...account };
            }
            return acc;
          });
          this.accountsUpdated.next([...this.accounts]);
        })
      );
  }
}
