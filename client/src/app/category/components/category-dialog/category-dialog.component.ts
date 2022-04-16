import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription, take } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { CategoryInterface } from '../../types/category.interface';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent implements OnInit, OnDestroy {
  faTimes = faTimes;
  submitStatus: boolean = false;

  categories!: CategoryInterface[];
  categoriesSubscription!: Subscription;

  addCategoryForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    type: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public category: CategoryInterface,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.setValues();
  }

  ngOnInit(): void {
    this.isTitleAvailable();
  }

  isTitleAvailable(): void {
    this.addCategoryForm.get('title')!.valueChanges.subscribe((title) => {
      console.log(title);
      this.categories
        .filter((category) => category?.type === this.category?.type)
        .forEach((category) => {
          if (category.title === this.category?.title) {
            return;
          } else if (category.title === title) {
            this.addCategoryForm.get('title')!.setErrors({
              titleTaken: true,
            });
          }
        });
    });
    console.log();
  }

  onSubmit(): void {
    let userId = localStorage.getItem('userId');
    let { title, type } = this.addCategoryForm.value;
    title = title.trim().toLowerCase();
    let uniqueness = userId + title + type;
    if (this.category) {
      let updatedCategory = {
        ...this.category,
        title,
        type,
        uniqueness,
      };
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

  getTitleError() {
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

  getTypeError() {
    return this.addCategoryForm.get('type')!.errors?.['required']
      ? 'Type is required'
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
        type: this.category.type,
      });
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
