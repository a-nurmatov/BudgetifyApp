import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  faTimes,
  faTrash,
  faEdit,
  faCircleArrowUp,
  faCircleArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription, take } from 'rxjs';
import { AccountService } from 'src/app/account/services/account.service';
import { CategoryInterface } from 'src/app/category/types/category.interface';
import { TransactionDialogComponent } from 'src/app/transaction/components/transaction-dialog/transaction-dialog.component';
import { TransactionService } from 'src/app/transaction/service/transaction.service';
import { TransactionInterface } from 'src/app/transaction/types/transaction.interface';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class TransactionDetailComponent {
  faTimes = faTimes;
  faTrash = faTrash;
  faEdit = faEdit;
  faCircleArrowUp = faCircleArrowUp;
  faCircleArrowDown = faCircleArrowDown;
  categories: CategoryInterface[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { transaction: TransactionInterface; currency: string },
    private dialog: MatDialog
  ) {
    this.data.transaction.categories.forEach((category) => {
      this.categories.push(JSON.parse(JSON.stringify(category)));
    });
  }

  editTransactionForm(transaction: TransactionInterface) {
    this.dialog.open(TransactionDialogComponent, {
      height: '520px',
      width: '600px',
      data: {
        ...transaction,
      },
    });
  }

  deleteTransactionConfirm(transactionId: TransactionInterface) {
    this.dialog.open(TransactionDeleteConfirmComponent, {
      data: this.data.transaction,
    });
  }
}

@Component({
  selector: 'app-transaction-delete-confirm',
  templateUrl: './transaction-delete-confirm.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class TransactionDeleteConfirmComponent implements OnDestroy {
  faTimes = faTimes;
  submitStatus: boolean = false;
  accountSubscription!: Subscription;
  constructor(
    @Inject(MAT_DIALOG_DATA) public transaction: TransactionInterface,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private accountService: AccountService,
    private transactionService: TransactionService
  ) {}

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
  }

  deleteTransaction(transaction: TransactionInterface) {
    this.accountSubscription = this.accountService
      .getActiveAccount()
      .subscribe((data) => {
        this.transactionService
          .deleteTransaction(transaction._id)
          .pipe(take(1))
          .subscribe(() => {
            let newAccount = {
              ...data,
              balance:
                data.balance +
                transaction.amount * this.multiplier(transaction.type),
            };
            this.accountService.updateAccount(newAccount).subscribe(
              () => {
                this.accountService.setActiveAccount(newAccount);
                this.submitStatus = true;
                this.openSnackBar('Transaction deleted successfully', 'Close');
                this.dialog.closeAll();
              },
              (error) => {
                this.submitStatus = false;
                this.openSnackBar('Transaction deletion failed', 'Close');
              }
            );
          });
      });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: this.submitStatus ? 'snackbar-success' : 'snackbar-error',
    });
  }

  multiplier(state: string): number {
    if (state === 'expense') {
      return 1;
    }
    return -1;
  }
}
