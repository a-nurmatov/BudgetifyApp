import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  faArrowDownWideShort,
  faCircleArrowUp,
  faCircleArrowDown,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/account/services/account.service';
import { TransactionDialogComponent } from 'src/app/transaction/components/transaction-dialog/transaction-dialog.component';
import { TransactionService } from 'src/app/transaction/service/transaction.service';
import { TransactionInterface } from 'src/app/transaction/types/transaction.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  faArrowDownWideShort = faArrowDownWideShort;
  faCircleArrowUp = faCircleArrowUp;
  faCircleArrowDown = faCircleArrowDown;
  faCirclePlus = faCirclePlus;

  accountTransactions!: TransactionInterface[];
  tempAccountTransactions!: TransactionInterface[];
  accountTransactionsSubscription!: Subscription;
  activeAccountSubscription!: Subscription;
  filterState: string = 'all';
  dateSort: string = 'decrease';

  constructor(
    private dialog: MatDialog,
    private transactionService: TransactionService,
    private accountService: AccountService
  ) {
    this.getInitialData();
  }

  expenseFilterTransactions(): void {
    this.filterState = 'expense';
    this.accountTransactions = this.tempAccountTransactions.filter(
      (transaction) => transaction.type === 'expense'
    );
  }

  incomeFilterTransactions(): void {
    this.filterState = 'income';
    this.accountTransactions = this.tempAccountTransactions.filter(
      (transaction) => transaction.type === 'income'
    );
  }

  reset(): void {
    this.filterState = 'all';
    this.accountTransactions = this.tempAccountTransactions;
  }

  increaseDateSort(): void {
    this.dateSort = 'increase';
    this.accountTransactions = this.accountTransactions.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }

  decreaseDateSort(): void {
    this.dateSort = 'decrease';
    this.accountTransactions = this.accountTransactions.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(TransactionDialogComponent, {
      height: '520px',
      width: '600px',
    });
  }

  getInitialData(): void {
    this.activeAccountSubscription = this.accountService
      .getActiveAccount()
      .subscribe((account) => {
        if (account?._id) {
          this.accountTransactionsSubscription = this.transactionService
            .requestAccountTransactions(account._id)
            .subscribe((data) => {
              this.accountTransactions = data.transactions;
              this.tempAccountTransactions = data.transactions;
              if (this.filterState === 'all') {
                this.reset();
              } else if (this.filterState === 'income') {
                this.incomeFilterTransactions();
              } else if (this.filterState === 'expense') {
                this.expenseFilterTransactions();
              }
              if (this.dateSort === 'increase') {
                this.increaseDateSort();
              } else if (this.dateSort === 'decrease') {
                this.decreaseDateSort();
              }
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.accountTransactionsSubscription.unsubscribe();
    this.activeAccountSubscription.unsubscribe();
  }
}
