import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import currencies from '@doubco/countries';
import { getCurrencySymbol } from '@angular/common';
import { AccountService } from '../../services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountInterface } from '../../types/account.interface';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.scss'],
})
export class DialogueComponent implements OnInit {
  submitStatus: boolean = false;
  faTimes = faTimes;
  listOfCountries = Object.values(currencies.data);
  userCountry: string | null = localStorage.getItem('country');
  userDefaultCurrency!: string | undefined;

  addAccountForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    currency: new FormControl(this.userDefaultCurrency, [Validators.required]),
    description: new FormControl('', [Validators.maxLength(256)]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public account: AccountInterface,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    if (this.account) {
      this.addAccountForm.get('title')!.setValue(this.account.title);
      this.addAccountForm
        .get('description')!
        .setValue(this.account.description);
      this.addAccountForm.get('currency')!.setValue(this.account.currency);
    }
  }

  ngOnInit(): void {
    this.setUserDefaultCurrency();
  }

  onSubmit(): void {
    const { title, currency, description } = this.addAccountForm.value;
    if (this.account) {
      console.log(title, currency, description);
      this.account = { ...this.account, title, currency, description };
      this.accountService
        .updateAccount(this.account)
        .pipe(take(1))
        .subscribe(
          (data) => {
            this.dialog.closeAll();
            this.submitStatus = true;
            this.openSnackBar('Account successfully updated', 'close');
          },
          (error) => {
            this.dialog.closeAll();
            this.submitStatus = false;
            this.openSnackBar('Account update failed', 'close');
          }
        );
    } else {
      const userId = localStorage.getItem('userId');
      this.accountService
        .addNewAccount(userId, title, currency, description)
        .pipe(take(1))
        .subscribe(
          (data) => {
            this.submitStatus = true;
            this.openSnackBar('Account successfully created', 'close');
          },
          (error) => {
            this.submitStatus = false;
            this.openSnackBar('Account with this name already exists', 'close');
          }
        );
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: this.submitStatus ? 'snackbar-success' : 'snackbar-error',
    });
  }

  setUserDefaultCurrency(): void {
    this.listOfCountries.forEach((country) => {
      if (country.name === this.userCountry) {
        this.userDefaultCurrency = country.currency;
      }
    });
    this.addAccountForm.get('currency')!.setValue(this.userDefaultCurrency);
  }

  getTitleError(): string {
    return this.addAccountForm.get('title')!.errors?.['required']
      ? 'Required field is empty'
      : this.addAccountForm.get('title')!.errors?.['maxlength']
      ? 'Max length is 128'
      : this.addAccountForm.get('title')!.errors?.['pattern']
      ? 'Only letters and numbers are allowed'
      : '';
  }

  getDescriptionError(): string {
    return this.addAccountForm.get('description')!.errors?.['maxlength']
      ? 'Max length is 256'
      : '';
  }

  getSymbol(currency: string): string {
    return getCurrencySymbol(currency, 'wide');
  }
}
