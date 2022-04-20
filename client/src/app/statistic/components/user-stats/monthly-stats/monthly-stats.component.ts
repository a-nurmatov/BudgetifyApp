import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/account/services/account.service';
import { TransactionService } from 'src/app/transaction/service/transaction.service';
import { Subscription } from 'rxjs';
import { TransactionInterface } from 'src/app/transaction/types/transaction.interface';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MMMM YYYY', // this is the format showing on the input element
    monthYearLabel: 'MMMM YYYY', // this is showing on the calendar
  },
};

@Component({
  selector: 'app-monthly-stats',
  templateUrl: './monthly-stats.component.html',
  styleUrls: ['./monthly-stats.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class MonthlyStatsComponent implements OnInit, OnDestroy {
  ELEMENT_DATA: MonthlyStats[] = [];
  activeAccountSubscription!: Subscription;
  accountTransactionsSubscription!: Subscription;
  transactions!: TransactionInterface[];
  tempTransactions!: TransactionInterface[];
  currency!: string;
  startDate: Date = new Date(new Date().getFullYear());
  endDate: Date = new Date();

  range = new FormGroup({
    start: new FormControl(new Date(new Date().getFullYear(), 0, 1)),
    end: new FormControl(new Date()),
  });

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService
  ) {
    this.watchDateChanges();
    this.getInitialData();
  }

  ngOnInit(): void {}

  watchDateChanges() {
    this.range.valueChanges.subscribe((data) => {
      if (data.start && data.end) {
        this.startDate = data.start;
        this.endDate = data.end;
        this.filterByDate(this.startDate, this.endDate);
      }
    });
  }

  getInitialData() {
    this.activeAccountSubscription = this.accountService
      .getActiveAccount()
      .subscribe((account) => {
        if (account) {
          this.accountTransactionsSubscription = this.transactionService
            .requestAccountTransactions(account._id)
            .subscribe((data) => {
              this.currency = account.currency;
              this.transactions = data.transactions;
              this.tempTransactions = data.transactions;
              this.filterByDate(this.startDate, this.endDate);
              console.log(this.transactions);
            });
        }
      });
  }

  filterByDate(start: Date, end: Date) {
    this.ELEMENT_DATA = [];
    this.dataSource = new MatTableDataSource<MonthlyStats>(this.ELEMENT_DATA);
    this.transactions = this.tempTransactions.filter((transaction) => {
      return (
        new Date(transaction.date) >= start && new Date(transaction.date) <= end
      );
    });
    this.transactions.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    this.transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      let monthStats = this.ELEMENT_DATA.find(
        (monthStat) => monthStat.month === month && monthStat.year === year
      );
      if (monthStats) {
        if (transaction.type === 'income') {
          monthStats.incomes += transaction.amount;
          monthStats.savings += transaction.amount;
          monthStats.percent = (monthStats.savings / monthStats.incomes) * 100;
        } else {
          monthStats.expenses += transaction.amount;
          monthStats.savings -= transaction.amount;
          if (monthStats.incomes === 0) {
            monthStats.percent = 0;
          } else {
            monthStats.percent =
              (monthStats.savings / monthStats.incomes) * 100;
          }
        }
      } else {
        monthStats = {
          month: month,
          year: year,
          incomes: transaction.type === 'income' ? transaction.amount : 0,
          expenses: transaction.type === 'expense' ? transaction.amount : 0,
          savings:
            transaction.type === 'income'
              ? transaction.amount
              : -1 * transaction.amount,
          percent:
            ((transaction.type === 'income' ? transaction.amount : 0) /
              (transaction.type === 'income' ? transaction.amount : 1)) *
            100,
        };
        this.ELEMENT_DATA.push(monthStats);
      }
    });
    this.dataSource = new MatTableDataSource<MonthlyStats>(this.ELEMENT_DATA);
  }

  displayedColumns: string[] = [
    'month',
    'incomes',
    'expenses',
    'savings',
    '% of savings',
  ];
  dataSource = new MatTableDataSource<MonthlyStats>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.activeAccountSubscription?.unsubscribe();
    this.accountTransactionsSubscription?.unsubscribe();
  }
}

export interface MonthlyStats {
  month: string;
  incomes: number;
  expenses: number;
  savings: number;
  percent: number;
  year: number;
}
