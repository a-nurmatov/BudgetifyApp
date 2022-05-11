import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
  Inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, Subscription, take } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CategoryService } from 'src/app/category/services/category.service';
import { CategoryInterface } from 'src/app/category/types/category.interface';
import {
  faCircleArrowDown,
  faCircleArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { AccountInterface } from 'src/app/account/types/account.interface';
import { AccountService } from 'src/app/account/services/account.service';
import { TransactionService } from '../../service/transaction.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransactionInterface } from '../../types/transaction.interface';
import { TransactionCancelConfirmComponent } from '../transaction-cancel-confirm/transaction-cancel-confirm.component';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.scss'],
})
export class TransactionDialogComponent implements OnInit, OnDestroy {
  faTimes = faTimes;
  faCircleArrowDown = faCircleArrowDown;
  faCircleArrowUp = faCircleArrowUp;

  submitStatus: boolean = false;
  filterState: string = 'income';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryCtrl = new FormControl('', [Validators.required]);
  filteredCategories!: string[];
  categories: string[] = [];
  allCategories: string[] = [];
  categoriesData!: CategoryInterface[];
  categoriesDataSubscription!: Subscription;

  activeAccount!: AccountInterface;
  activeAccountSubscription!: Subscription;
  currency!: string;

  transactionForm: FormGroup = new FormGroup({
    // type: new FormControl('', [Validators.required]),
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    amount: new FormControl('', [Validators.required, Validators.min(1)]),
    payee: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.maxLength(256)]),
  });

  constructor(
    private categoryService: CategoryService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public transaction: TransactionInterface
  ) {
    this.categoryCtrl.valueChanges.subscribe((value) => {
      if (value) {
        this.filteredCategories = this.allCategories.filter((category) => {
          return category.toLowerCase().includes(value.toLowerCase());
        });
      } else {
        this.filteredCategories = this.allCategories;
      }
    });
    this.setValues();
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: this.submitStatus ? 'snackbar-success' : 'snackbar-error',
    });
  }

  ngOnInit(): void {
    this.isDateValid();
  }

  ngOnDestroy(): void {
    this.categoriesDataSubscription.unsubscribe();
    this.activeAccountSubscription.unsubscribe();
  }

  cancelConfirm(): void {
    this.dialog.open(TransactionCancelConfirmComponent);
  }

  setIncomeFilter(): void {
    this.categories = [];
    this.filteredCategories = [];
    this.filterState = 'income';
    this.filterCategories(this.filterState);
  }

  setExpenseFilter(): void {
    this.categories = [];
    this.filteredCategories = [];
    this.filterState = 'expense';
    this.filterCategories(this.filterState);
  }

  filterCategories(state: string): void {
    this.allCategories = this.categoriesData
      .filter((category) => category.type === state)
      .map((category) => {
        return (
          category.title?.slice(0, 1).toUpperCase() + category.title.slice(1)
        );
      });
  }

  setFormValues(): void {
    this.transactionForm.get('title')!.setValue(this.transaction.title);
    this.transactionForm.get('amount')!.setValue(this.transaction.amount);
    this.transactionForm.get('payee')!.setValue(this.transaction.payee);
    this.transactionForm.get('date')!.setValue(new Date(this.transaction.date));
    this.transactionForm
      .get('description')!
      .setValue(this.transaction.description);
    this.filterState = this.transaction.type;
    this.transaction.categories.forEach((category) => {
      this.categories.push(JSON.parse(JSON.stringify(category)).title);
    });
  }

  setValues(): void {
    if (this.transaction) {
      this.setFormValues();
    }
    let userId = localStorage.getItem('userId');
    this.categoryService
      .requestUserCategories(userId)
      .pipe(take(1))
      .subscribe((data) => {
        this.categoryService.setInitialData(data.categories);
      });

    this.categoriesDataSubscription = this.categoryService
      .getUserCategories()
      .subscribe((data) => {
        this.categoriesData = data;
        this.filterCategories(this.filterState);
      });

    this.activeAccountSubscription = this.accountService
      .getActiveAccount()
      .subscribe((data) => {
        this.activeAccount = data;
        this.currency = this.activeAccount.currency;
      });
  }

  onSubmit(): void {
    let userId = localStorage.getItem('userId');
    let title: string = this.transactionForm.get('title')!.value;
    let amount: number = this.transactionForm.get('amount')!.value;
    let date: string = new Date(
      this.transactionForm.get('date')!.value
    ).toDateString();
    let description: string = this.transactionForm.get('description')!.value;
    let payee: string = this.transactionForm.get('payee')!.value;
    let accountId = this.activeAccount._id;
    let categoryIds: string[] = [];
    let notExistingCategories: string[] = [];

    this.categories.forEach((category) => {
      let check = this.categoriesData
        .filter((category) => {
          return category.type === this.filterState;
        })
        .find((data) => data.title === category)?._id;
      if (check) {
        categoryIds.push(check);
      } else {
        notExistingCategories.push(category);
      }
    });

    if (this.transaction) {
      let typeChange = this.transaction.type !== this.filterState ? -1 : 1;
      let newTransaction = {
        ...this.transaction,
        type: this.filterState,
        title,
        amount,
        date,
        description,
        payee,
        accountId,
        categories: categoryIds,
      };

      this.categoryService
        .addListOfNewCategories(notExistingCategories, userId, this.filterState)
        .pipe(take(1))
        .subscribe((data) => {
          data.response.forEach((categoryId) => {
            categoryIds.push(categoryId);
          });
          this.transactionService
            .updateTransaction(newTransaction)
            .pipe(take(1))
            .subscribe(
              (data) => {
                this.dialog.closeAll();
                let newAccount = {
                  ...this.activeAccount,
                  balance:
                    this.activeAccount.balance +
                    this.updateAmount(
                      this.filterState,
                      amount,
                      this.transaction.amount,
                      typeChange
                    ),
                };
                this.accountService
                  .updateAccount(newAccount)
                  .pipe(take(1))
                  .subscribe((data) => {
                    this.accountService.setActiveAccount(data.updatedAccount);
                    this.submitStatus = true;
                    this.openSnackBar(
                      'Transaction updated successfully',
                      'Close'
                    );
                  });
              },
              (error) => {
                this.submitStatus = false;
                this.openSnackBar('Transaction update failed', 'OK');
              }
            );
        });
    } else {
      this.categoryService
        .addListOfNewCategories(notExistingCategories, userId, this.filterState)
        .pipe(take(1))
        .subscribe((data) => {
          data.response.forEach((categoryId) => {
            categoryIds.push(categoryId);
          });
          let newTransaction = {
            type: this.filterState,
            title,
            amount,
            date,
            description,
            payee,
            accountId,
            categories: categoryIds,
          };

          this.transactionService
            .addNewTransaction(newTransaction)
            .pipe(take(1))
            .subscribe(
              (data) => {
                this.dialog.closeAll();
                let newAccount = {
                  ...this.activeAccount,
                  balance:
                    this.activeAccount.balance +
                    amount * this.multiplier(this.filterState),
                };
                this.accountService
                  .updateAccount(newAccount)
                  .pipe(take(1))
                  .subscribe((data) => {
                    this.accountService.setActiveAccount(data.updatedAccount);
                    this.submitStatus = true;
                    this.openSnackBar(
                      'Transaction added successfully',
                      'Close'
                    );
                  });
              },
              (error) => {
                this.submitStatus = false;
                this.openSnackBar('Transaction failed', 'Close');
              }
            );
        });
    }
  }

  isDateValid(): void {
    this.transactionForm.get('date')!.valueChanges.subscribe((value) => {
      let today: Date = new Date();

      if (new Date(value) > today) {
        this.transactionForm.get('date')!.setErrors({ futureDate: true });
      }

      return null;
    });
  }

  getTypeError(): string {
    return this.transactionForm.get('type')!.errors?.['required']
      ? 'You must enter a type'
      : '';
  }

  getTitleError(): string {
    return this.transactionForm.get('title')!.errors?.['required']
      ? 'Title is required'
      : this.transactionForm.get('title')!.errors?.['maxlength']
      ? 'Max length is 128'
      : this.transactionForm.get('title')!.errors?.['pattern']
      ? 'Only letters and numbers are allowed'
      : '';
  }

  getAmountError(): string {
    return this.transactionForm.get('amount')!.errors?.['required']
      ? 'Amount is required'
      : this.transactionForm.get('amount')!.errors?.['min']
      ? 'Min amount is 1'
      : '';
  }

  getDateError(): string {
    return this.transactionForm.get('date')!.errors?.['required']
      ? 'Date is required'
      : this.transactionForm.get('date')!.errors?.['futureDate']
      ? 'Future date is not allowed'
      : '';
  }

  getPayeeError(): string {
    return this.transactionForm.get('payee')!.errors?.['required']
      ? 'Payee is required'
      : this.transactionForm.get('payee')!.errors?.['maxlength']
      ? 'Max length is 128'
      : this.transactionForm.get('payee')!.errors?.['pattern']
      ? 'Only letters and numbers are allowed'
      : '';
  }

  getDescriptionError(): string {
    return this.transactionForm.get('description')!.errors?.['maxlength']
      ? 'Max length is 256'
      : '';
  }

  @ViewChild('categoryInput') categoryInput!: ElementRef<HTMLInputElement>;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our category
    if ((value || '').trim().toLowerCase()) {
      if (!this.categories.includes(value.trim().toLowerCase())) {
        this.categories.push(value.trim().toLocaleLowerCase());
      }
    }

    // Clear the input value
    event.chipInput!.clear();

    this.categoryCtrl.setValue(null);
  }

  remove(category: string): void {
    const index = this.categories.indexOf(category);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if ((event.option.viewValue || '').trim()) {
      if (
        !this.categories.includes(event.option.viewValue.trim().toLowerCase())
      ) {
        this.categories.push(event.option.viewValue.trim().toLowerCase());
      }
    }

    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCategories.filter((category) =>
      category.toLowerCase().includes(filterValue)
    );
  }

  multiplier(state: string): number {
    if (this.filterState === 'expense') {
      return -1;
    }
    return 1;
  }

  updateAmount(
    state: string,
    newAmount: number,
    oldAmount: number,
    typeChange: number
  ): number {
    if (state === 'expense') {
      if (typeChange === -1) {
        return -oldAmount - newAmount;
      }
      return oldAmount - newAmount;
    } else if (state === 'income') {
      if (typeChange === -1) {
        return oldAmount + newAmount;
      }
      return newAmount - oldAmount;
    }
    return 0;
  }
}
