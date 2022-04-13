import { Component, Inject, Input } from '@angular/core';
import { AccountInterface } from '../../types/account.interface';
import {
  faEye,
  faEdit,
  faTrash,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from '../../services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogueComponent } from '../dialogue/dialogue.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent {
  faEye = faEye;
  @Input() activeAccount: boolean = false;
  @Input() account!: AccountInterface;
  constructor(public dialog: MatDialog) {}

  viewDetails(): void {
    this.dialog.open(AccountDetailsComponent, {
      height: '520px',
      width: '600px',
      data: this.account,
    });
  }
}

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent {
  faEdit = faEdit;
  faTrash = faTrash;
  faTimes = faTimes;

  constructor(
    @Inject(MAT_DIALOG_DATA) public account: AccountInterface,
    public dialog: MatDialog
  ) {}

  editAccountForm(account: AccountInterface): void {
    let dialogRef = this.dialog.open(DialogueComponent, {
      height: '520px',
      width: '600px',
      data: this.account,
    });
  }

  deleteAccountConfirm(accountId: string | undefined): void {
    this.dialog.open(AccountDeleteConfirmComponent, {
      data: accountId,
    });
  }
}

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
