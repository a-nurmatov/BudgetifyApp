import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  faTimes,
  faCircleArrowDown,
  faCircleArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription, take } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { CategoryInterface } from '../../types/category.interface';
import { EditConfirmationComponent } from '../edit-confirm/edit-confirm.component';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent implements OnInit, OnDestroy {
  faTimes = faTimes;
  faCircleArrowUp = faCircleArrowUp;
  faCircleArrowDown = faCircleArrowDown;
  submitStatus: boolean = false;
  filterState: string = 'income';

  categories!: CategoryInterface[];
  categoriesSubscription!: Subscription;

  addCategoryForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public category: CategoryInterface,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isTitleAvailable();
    this.setValues();
  }

  isTitleAvailable(): void {
    this.addCategoryForm.get('title')!.valueChanges.subscribe((title) => {
      title = title.trim().toLowerCase();
      this.categories
        ?.filter((category) => category.type === this.filterState)
        .forEach((category) => {
          if (this.category?.title === title) {
            return;
          }
          if (category.title === title) {
            this.addCategoryForm.get('title')!.setErrors({
              titleTaken: true,
            });
          }
        });
    });
  }

  setIncomeFilter(): void {
    this.filterState = 'income';
    let val = this.addCategoryForm.get('title')?.value;
    this.addCategoryForm.get('title')?.setValue(val);
  }

  setExpenseFilter(): void {
    this.filterState = 'expense';
    let val = this.addCategoryForm.get('title')?.value;
    this.addCategoryForm.get('title')?.setValue(val);
  }

  onSubmit(): void {
    let userId = localStorage.getItem('userId');
    let { title } = this.addCategoryForm.value;
    let type = this.filterState;
    title = title.trim().toLowerCase();
    let uniqueness = userId + title + type;
    if (this.category) {
      let updatedCategory = {
        ...this.category,
        title,
        type,
        uniqueness,
      };
      let editConfirmRef = this.dialog.open(EditConfirmationComponent, {
        height: '350px',
        width: '400px',
      });
      editConfirmRef.afterClosed().subscribe((result) => {
        if (result) {
          this.categoryService
            .updateCategory(updatedCategory)
            .pipe(take(1))
            .subscribe(
              (data) => {
                this.dialog.closeAll();
                this.submitStatus = true;
                this.openSnackBar('Account successfully updated', 'close');
              },
              (error) => {
                this.submitStatus = false;
                this.openSnackBar(
                  'Account update failed, please check title and try again',
                  'close'
                );
              }
            );
        }
      });
    } else {
      this.categoryService
        .addNewCateogry(title, type, userId, uniqueness)
        .pipe(take(1))
        .subscribe(
          (data) => {
            this.dialog.closeAll();
            this.submitStatus = true;
            this.openSnackBar('Category added successfully', 'Close');
          },
          (error) => {
            this.submitStatus = false;
            this.openSnackBar(
              'Unsuccessful! Try to enter different title',
              'Close'
            );
          }
        );
    }
  }

  getTitleError(): string {
    return this.addCategoryForm.get('title')!.errors?.['required']
      ? 'Title is required'
      : this.addCategoryForm.get('title')!.errors?.['maxlength']
      ? 'Max length is 128'
      : this.addCategoryForm.get('title')!.errors?.['pattern']
      ? 'Only letters and numbers are allowed'
      : this.addCategoryForm.get('title')!.errors?.['titleTaken']
      ? 'Title already in use'
      : '';
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: this.submitStatus ? 'snackbar-success' : 'snackbar-error',
    });
  }

  setValues(): void {
    if (this.category) {
      this.addCategoryForm.patchValue({
        title: this.category.title,
      });
      this.filterState = this.category.type;
    }

    let userId = localStorage.getItem('userId');
    this.categoryService
      .requestUserCategories(userId)
      .pipe(take(1))
      .subscribe((data) => {
        this.categoryService.setInitialData(data.categories);
      });

    this.categoriesSubscription = this.categoryService
      .getUserCategories()
      .subscribe((data) => {
        this.categories = data;
      });
  }

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }
}
