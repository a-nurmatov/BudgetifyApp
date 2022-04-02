import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  hide: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.loginForm.value);
    this.authService.healthCheck().subscribe((data) => console.log(data));
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(
      (data) => {
        console.log(data, 'DATA from backend');
        this.router.navigateByUrl('/main');
      },
      (error) => {
        if (error.status === 401) {
          this.openSnackBar('Wrong email or password', 'Close');
        }
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: 'snackbar-error',
    });
  }

  getEmailError() {
    return this.loginForm.get('email')!.errors?.['required']
      ? 'Required field is empty'
      : this.loginForm.get('email')!.errors?.['pattern']
      ? 'Please enter a valid email'
      : '';
  }

  getPasswordError() {
    return this.loginForm.get('password')!.errors?.['required']
      ? 'Required field is empty'
      : this.loginForm.get('password')!.errors?.['minlength']
      ? 'Password must be at least 6 characters long'
      : '';
  }
}
