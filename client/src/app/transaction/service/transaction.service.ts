import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { AccountService } from 'src/app/account/services/account.service';
import { TransactionInterface } from '../types/transaction.interface';

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
    private accountService: AccountService
  ) {}

  getAllTransactions(): Observable<{
    message: string;
    transactions: TransactionInterface[];
  }> {
    return this.http.get<{
      message: string;
      transactions: TransactionInterface[];
    }>('http://localhost:5000/transactions/all');
  }

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

  updateTransaction(
    transaction: TransactionInterface
  ): Observable<{ message: string; updatedTransaction: TransactionInterface }> {
    let updatedTransaction = { ...transaction };
    delete updatedTransaction._id;
    return this.http
      .patch<{
        message: string;
        updatedTransaction: TransactionInterface;
      }>(`http://localhost:5000/transactions/${transaction._id}`, transaction)
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
    return this.http
      .delete(`http://localhost:5000/transactions/${transactionId}`)
      .pipe(
        tap(() => {
          this.transactions = this.transactions.filter(
            (transaction) => transaction._id !== transactionId
          );
          this.transactionsUpdated.next([...this.transactions]);
        })
      );
  }
}
