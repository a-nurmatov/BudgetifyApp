import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transaction-cancel-confirm',
  templateUrl: './transaction-cancel-confirm.component.html',
  styleUrls: ['./transaction-cancel-confirm.component.scss'],
})
export class TransactionCancelConfirmComponent {
  faTimes = faTimes;

  constructor(private dialog: MatDialog) {}

  cancel(): void {
    this.dialog.closeAll();
  }
}
