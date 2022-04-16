import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  addNewTransaction(transaction: any): Observable<any> {
    console.log(transaction);
    return this.http.post('http://localhost:5000/transactions', transaction);
  }
}
