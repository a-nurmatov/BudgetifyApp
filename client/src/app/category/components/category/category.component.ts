import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  faCirclePlus,
  faCircleArrowDown,
  faCircleArrowUp,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription, take } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { CategoryInterface } from '../../types/category.interface';
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

@Component({
  selector: 'app-category-delete-confirm',
  templateUrl: './category-delete-confirm.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryDeleteConfirmComponent {
  faTimes = faTimes;
  submitStatus: boolean = false;
  constructor(
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public category: CategoryInterface,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  deleteCategory(category: CategoryInterface): void {
    this.categoryService
      .deleteCategory(category)
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.submitStatus = true;
          this.openSnackBar('Category deleted successfully', 'Close');
          this.dialog.closeAll();
        },
        (error) => {
          this.submitStatus = false;
          this.openSnackBar('Something went wrong, please try again', 'Close');
        }
      );
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: this.submitStatus ? 'snackbar-success' : 'snackbar-error',
    });
  }
}
