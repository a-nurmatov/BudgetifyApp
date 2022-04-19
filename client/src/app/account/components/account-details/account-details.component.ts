import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faEdit, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AccountInterface } from '../../types/account.interface';
import { AccountDeleteConfirmComponent } from '../account-delete-confirm/account-delete-confirm.component';
import { DialogueComponent } from '../dialogue/dialogue.component';

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
