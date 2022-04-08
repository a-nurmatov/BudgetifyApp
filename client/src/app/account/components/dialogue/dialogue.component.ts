import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import currencies from '@doubco/countries';
import { getCurrencySymbol } from '@angular/common';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.scss'],
})
export class DialogueComponent implements OnInit {
  faTimes = faTimes;
  listOfCountries = Object.values(currencies.data);
  userCountry: string | null = localStorage.getItem('country');
  userDefaultCurrency!: string | undefined;

  addAccountForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
    ]),
    currency: new FormControl(this.userDefaultCurrency, [Validators.required]),
    description: new FormControl('', [Validators.maxLength(256)]),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.listOfCountries.forEach((country) => {
      if (country.name === this.userCountry) {
        this.userDefaultCurrency = country.currency;
      }
    });
    console.log(this.userDefaultCurrency);
    this.addAccountForm.get('currency')!.setValue(this.userDefaultCurrency);
  }

  onSubmit() {
    console.log(this.addAccountForm.value);
  }

  getTitleError() {
    return this.addAccountForm.get('title')!.errors?.['required']
      ? 'Required field is empty'
      : this.addAccountForm.get('title')!.errors?.['maxlength']
      ? 'Max length is 128'
      : '';
  }

  getDescriptionError() {
    return this.addAccountForm.get('description')!.errors?.['maxlength']
      ? 'Max length is 256'
      : '';
  }

  getSymbol(currency: string) {
    return getCurrencySymbol(currency, 'wide');
  }
}
