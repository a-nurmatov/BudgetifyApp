import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  faCirclePlus,
  faCircleArrowDown,
  faCircleArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription, take } from 'rxjs';
import { TransactionService } from 'src/app/transaction/service/transaction.service';
import { TransactionInterface } from 'src/app/transaction/types/transaction.interface';
import { CategoryService } from '../../services/category.service';
import { CategoryInterface } from '../../types/category.interface';
import { CategoryDeleteConfirmComponent } from '../category-delete-confirm/category-delete-confirm.component';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnDestroy {
  faCirclePlus = faCirclePlus;
  faCircleArrowDown = faCircleArrowDown;
  faCircleArrowUp = faCircleArrowUp;

  userCategories!: CategoryInterface[];
  tempUserCategories!: CategoryInterface[];
  userCategoriesSubscription!: Subscription;
  filterState: string = 'all';
  search = new FormControl();
  allTransactions!: TransactionInterface[];

  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService,
    private transactionService: TransactionService
  ) {
    this.getInitialData();
    this.watchSearch();
  }

  incomeFilterCategories(): void {
    this.filterState = 'income';
    this.userCategories = this.tempUserCategories.filter(
      (category) => category.type === 'income'
    );
  }

  expenseFilterCategories(): void {
    this.filterState = 'expense';
    this.userCategories = this.tempUserCategories.filter(
      (category) => category.type === 'expense'
    );
  }

  resetCategories(): void {
    this.filterState = 'all';
    this.userCategories = this.tempUserCategories;
  }

  editCategoryForm(category: CategoryInterface): void {
    this.dialog.open(CategoryDialogComponent, {
      height: '350px',
      width: '400px',
      data: category,
    });
  }

  deleteConfirmation(category: CategoryInterface): void {
    let isRemovable = true;
    this.allTransactions.forEach((transaction) => {
      let transactionCategories = JSON.parse(
        JSON.stringify(transaction.categories)
      );
      transactionCategories.forEach(
        (transactionCategory: TransactionInterface) => {
          if (transactionCategory._id === category._id) {
            isRemovable = false;
          }
        }
      );
    });
    this.dialog.open(CategoryDeleteConfirmComponent, {
      data: {
        category,
        isRemovable,
      },
    });
  }

  watchSearch() {
    this.search.valueChanges.subscribe((value) => {
      if (value) {
        this.userCategories = this.tempUserCategories.filter((category) =>
          category.title.toLowerCase().includes(value.toLowerCase())
        );
      } else {
        this.resetCategories();
      }
    });
  }

  addCategory() {
    this.dialog.open(CategoryDialogComponent, {
      height: '350px',
      width: '400px',
    });
  }

  getInitialData() {
    let userId = localStorage.getItem('userId');
    this.categoryService
      .requestUserCategories(userId)
      .pipe(take(1))
      .subscribe((data) => {
        this.categoryService.setInitialData(data.categories);
      });

    this.userCategoriesSubscription = this.categoryService
      .getUserCategories()
      .subscribe((data) => {
        this.userCategories = data;
        this.tempUserCategories = data;
        if (this.filterState === 'all') {
          this.resetCategories();
        } else if (this.filterState === 'income') {
          this.incomeFilterCategories();
        } else if (this.filterState === 'expense') {
          this.expenseFilterCategories();
        }
      });

    this.transactionService
      .getAllTransactions()
      .pipe(take(1))
      .subscribe((data) => {
        this.allTransactions = data.transactions;
      });
  }

  ngOnDestroy(): void {
    this.userCategoriesSubscription.unsubscribe();
  }
}
