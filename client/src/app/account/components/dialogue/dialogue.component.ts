import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import currencies from '@doubco/countries';
import { getCurrencySymbol } from '@angular/common';
import { AccountService } from '../../services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';

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
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.setUserDefaultCurrency();
  }

  onSubmit(): void {
    const { title, currency, description } = this.addAccountForm.value;
    const userId = localStorage.getItem('userId');
    this.accountService
      .addNewAccount(userId, title, currency, description)
      .pipe(take(1))
      .subscribe(
        (data) => {
          console.log(data);
          this.submitStatus = true;
          this.openSnackBar('Account successfully created', 'close');
        },
        (error) => {
          this.openSnackBar('Account with this name already exists', 'close');
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
