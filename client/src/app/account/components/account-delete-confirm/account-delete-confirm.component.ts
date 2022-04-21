import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account-delete-confirm',
  templateUrl: './account-delete-confirm.component.html',
  styleUrls: ['./account-delete-confirm.component.scss'],
})
export class AccountDeleteConfirmComponent {
  faTimes = faTimes;
  submitStatus: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public accountId: string | undefined,
    private snackBar: MatSnackBar,
    private accountService: AccountService,
    private dialog: MatDialog
  ) {}

  deleteAccount(accountId: string | undefined): void {
    this.accountService
      .deleteAccount(accountId)
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.dialog.closeAll();
          this.submitStatus = true;
          this.openSnackBar('Account successfully deleted', 'close');
        },
        (error) => {
          this.dialog.closeAll();
          this.submitStatus = false;
          this.openSnackBar('Account deletion failed', 'close');
        }
      );
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: this.submitStatus ? 'snackbar-success' : 'snackbar-error',
    });
  }
}
