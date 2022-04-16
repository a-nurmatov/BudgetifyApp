import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { TransactionInterface } from '../types/transaction.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactions: TransactionInterface[] = [];
  private transactionsUpdated: Subject<TransactionInterface[]> = new Subject<
    TransactionInterface[]
  >();

  constructor(private http: HttpClient) {}

  addNewTransaction(
    transaction: TransactionInterface
  ): Observable<{ message: string; newTransaction: TransactionInterface }> {
    return this.http
      .post<{
        message: string;
        newTransaction: TransactionInterface;
      }>('http://localhost:5000/transactions', transaction)
      .pipe(
        tap((data) => {
          this.transactions.unshift(data.newTransaction);
          this.transactionsUpdated.next([...this.transactions]);
        })
      );
  }

  requestAccountTransactions(
    accountId: string | undefined
  ): Observable<{ message: string; transactions: TransactionInterface[] }> {
    return this.http.get<{
      message: string;
      transactions: TransactionInterface[];
    }>(`http://localhost:5000/transactions/${accountId}`);
  }

  setInitialData(transactions: TransactionInterface[]) {
    this.transactions = transactions;
    this.transactionsUpdated.next([...this.transactions]);
  }

  getAccountTransactions(): Observable<TransactionInterface[]> {
    return this.transactionsUpdated.asObservable();
  }
}
