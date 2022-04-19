import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  faCirclePlus,
  faCircleArrowDown,
  faCircleArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription, take } from 'rxjs';
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

  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService
  ) {
    this.getInitialData();
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
    this.dialog.open(CategoryDeleteConfirmComponent, {
      data: category,
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
  }

  ngOnDestroy(): void {
    this.userCategoriesSubscription.unsubscribe();
  }
}
