import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/account/services/account.service';
import { AccountInterface } from 'src/app/account/types/account.interface';
import { CategoryInterface } from 'src/app/category/types/category.interface';
import { TransactionService } from 'src/app/transaction/service/transaction.service';
import { TransactionInterface } from 'src/app/transaction/types/transaction.interface';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.scss'],
})
export class ExpenseTableComponent implements OnInit, OnDestroy {
  ELEMENT_DATA: CategoryData[] = [];
  activeAccount!: AccountInterface;
  activeAccountSubscription!: Subscription;
  transactions!: TransactionInterface[];
  tempTransactions!: TransactionInterface[];
  accountTransactionsSubscription!: Subscription;
  currency!: string;
  totalExpense: number = -1;
  startDate: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  endDate: Date = new Date();

  range = new FormGroup({
    start: new FormControl(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    ),
    end: new FormControl(new Date()),
  });

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService
  ) {
    this.getInitialData();
    this.watchDateChanges();
  }

  ngOnInit(): void {}

  displayedColumns: string[] = ['category', 'amount', '% in total'];
  dataSource = new MatTableDataSource<CategoryData>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  watchDateChanges() {
    this.range.valueChanges.subscribe((data) => {
      if (data.start && data.end) {
        this.startDate = data.start;
        this.endDate = data.end;
        this.filterByDateAndCategories(this.startDate, this.endDate);
      }
    });
  }

  filterByDateAndCategories(start: Date, end: Date) {
    this.ELEMENT_DATA = [];
    this.dataSource = new MatTableDataSource<CategoryData>(this.ELEMENT_DATA);
    this.transactions = this.tempTransactions.filter((transaction) => {
      return (
        new Date(transaction.date) >= start && new Date(transaction.date) <= end
      );
    });
    this.caculateTotalExpense();
    this.filterByCategory();
  }

  caculateTotalExpense() {
    this.totalExpense = 0;
    this.transactions.forEach((transaction) => {
      this.totalExpense += transaction.amount;
    });
  }

  filterByCategory() {
    this.transactions.forEach((transaction) => {
      let categoriesData = JSON.parse(JSON.stringify(transaction.categories));
      categoriesData.forEach((category: CategoryInterface) => {
        let categoryData = this.ELEMENT_DATA.find(
          (data) => data.category === category.title
        );
        if (categoryData) {
          categoryData.amount += transaction.amount;
          categoryData.percent =
            (categoryData.amount / this.totalExpense) * 100;
        } else {
          this.ELEMENT_DATA.push({
            category: category.title,
            amount: transaction.amount,
            percent: (transaction.amount / this.totalExpense) * 100,
          });
        }
      });
    });
    this.ELEMENT_DATA.sort((a, b) => b.amount - a.amount);
    this.dataSource = new MatTableDataSource<CategoryData>(this.ELEMENT_DATA);
  }

  getInitialData() {
    this.activeAccountSubscription = this.accountService
      .getActiveAccount()
      .subscribe((account) => {
        if (account?._id) {
          this.accountTransactionsSubscription = this.transactionService
            .requestAccountTransactions(account._id)
            .subscribe((data) => {
              this.activeAccount = account;
              this.currency = account.currency;
              this.transactions = data.transactions.filter(
                (transaction) => transaction.type === 'expense'
              );
              this.tempTransactions = [...this.transactions];
              console.log(this.transactions);
              this.filterByDateAndCategories(this.startDate, this.endDate);
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.activeAccountSubscription.unsubscribe();
    this.accountTransactionsSubscription.unsubscribe();
  }
}

export interface CategoryData {
  category: string;
  amount: number;
  percent: number;
}
