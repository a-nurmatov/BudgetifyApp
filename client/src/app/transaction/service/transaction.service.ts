import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { TransactionInterface } from '../types/transaction.interface';
import { environment } from '../../../environments/environment';

const BASE_API = `${environment.apiURL}/transactions`;

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactions: TransactionInterface[] = [];
  private transactionsUpdated: Subject<TransactionInterface[]> = new Subject<
    TransactionInterface[]
  >();

  constructor(
    private http: HttpClient,
  ) {}

  getAllTransactions(): Observable<{
    message: string;
    transactions: TransactionInterface[];
  }> {
    return this.http.get<{
      message: string;
      transactions: TransactionInterface[];
    }>(`${BASE_API}/all`);
  }

  addNewTransaction(
    transaction: TransactionInterface
  ): Observable<{ message: string; newTransaction: TransactionInterface }> {
    return this.http
      .post<{
        message: string;
        newTransaction: TransactionInterface;
      }>(BASE_API, transaction)
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
    }>(`${BASE_API}/${accountId}`);
  }

  setInitialData(transactions: TransactionInterface[]) {
    this.transactions = transactions;
    this.transactionsUpdated.next([...this.transactions]);
  }

  getAccountTransactions(): Observable<TransactionInterface[]> {
    return this.transactionsUpdated.asObservable();
  }

  updateTransaction(
    transaction: TransactionInterface
  ): Observable<{ message: string; updatedTransaction: TransactionInterface }> {
    let updatedTransaction = { ...transaction };
    delete updatedTransaction._id;
    return this.http
      .patch<{
        message: string;
        updatedTransaction: TransactionInterface;
      }>(`${BASE_API}/${transaction._id}`, transaction)
      .pipe(
        tap((data) => {
          this.transactions = this.transactions.map((transaction) => {
            if (transaction._id === data.updatedTransaction._id) {
              return data.updatedTransaction;
            }
            return transaction;
          });
          this.transactionsUpdated.next([...this.transactions]);
        })
      );
  }

  deleteTransaction(transactionId: string | undefined): Observable<any> {
    return this.http.delete(`${BASE_API}/${transactionId}`).pipe(
      tap(() => {
        this.transactions = this.transactions.filter(
          (transaction) => transaction._id !== transactionId
        );
        this.transactionsUpdated.next([...this.transactions]);
      })
    );
  }
}
