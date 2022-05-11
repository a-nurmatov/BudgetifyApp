import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import currencies from '@doubco/countries';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  hide: boolean = true;
  listOfCountries = Object.values(currencies.data);
  submitStatus: boolean = false;

  signUpForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    country: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.signUpForm.value);
    const { firstName, lastName, email, password, country } =
      this.signUpForm.value;
    this.authService
      .registerUser(
        email,
        password,
        country,
        firstName,
        lastName,
        new Date().toDateString()
      )
      .subscribe(
        (data) => {
          this.submitStatus = true;
          this.openSnackBar('Registered! Now you can log in.', 'Close');
          this.router.navigateByUrl('/login');
        },
        (error) => {
          this.submitStatus = false;
          this.openSnackBar('Email already in use', 'Close');
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

  getEmailError(): string {
    return this.signUpForm.get('email')!.errors?.['required']
      ? 'Required field is empty'
      : this.signUpForm.get('email')!.errors?.['pattern']
      ? 'Please enter a valid email'
      : '';
  }

  getPasswordError(): string {
    return this.signUpForm.get('password')!.errors?.['required']
      ? 'Required field is empty'
      : this.signUpForm.get('password')!.errors?.['minlength']
      ? 'Password must be at least 6 characters long'
      : '';
  }

  getDateError(): string {
    return this.signUpForm.get('date')!.errors?.['required']
      ? 'Date is required'
      : this.signUpForm.get('date')!.errors?.['futureDate']
      ? 'Future date is not allowed'
      : '';
  }

  isDateValid(): void {
    this.signUpForm.get('date')!.valueChanges.subscribe((value) => {
      let today: Date = new Date();

      if (new Date(value) > today) {
        this.signUpForm.get('date')!.setErrors({ futureDate: true });
      }

      return null;
    });
  }

  getFirstNameError(): string {
    return this.signUpForm.get('firstName')!.errors?.['required']
      ? 'Required field is empty'
      : this.signUpForm.get('firstName')!.errors?.['pattern']
      ? 'Only letters are allowed'
      : '';
  }

  getLastNameError(): string {
    return this.signUpForm.get('lastName')!.errors?.['required']
      ? 'Required field is empty'
      : this.signUpForm.get('lastName')!.errors?.['pattern']
      ? 'Only letters are allowed'
      : '';
  }

  getCountryError(): string {
    return this.signUpForm.get('country')!.errors?.['required']
      ? 'Country is required'
      : '';
  }
}
