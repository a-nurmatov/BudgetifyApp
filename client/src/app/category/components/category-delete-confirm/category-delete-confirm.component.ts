import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { CategoryInterface } from '../../types/category.interface';

@Component({
  selector: 'app-category-delete-confirm',
  templateUrl: './category-delete-confirm.component.html',
  styleUrls: ['./category-delete-confirm.component.scss'],
})
export class CategoryDeleteConfirmComponent {
  faTimes = faTimes;
  submitStatus: boolean = false;
  constructor(
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA)
    public data: { isRemovable: boolean; category: CategoryInterface },
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  deleteCategory(category: CategoryInterface, isRemovable: boolean): void {
    if (isRemovable) {
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
            this.openSnackBar(
              'Something went wrong, please try again',
              'Close'
            );
          }
        );
    } else {
      this.submitStatus = false;
      this.openSnackBar(
        'Category cannot be deleted. Category used in transaction!',
        'Close'
      );
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: this.submitStatus ? 'snackbar-success' : 'snackbar-error',
    });
  }
}
