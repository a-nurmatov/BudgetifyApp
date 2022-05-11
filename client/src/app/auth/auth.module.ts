import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginRedirectComponent } from './components/login-redirect/login-redirect.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthFormComponent,
  },
  {
    path: 'login-redirect',
    component: LoginRedirectComponent,
  },
  {
    path: 'sign-up',
    component: SignupFormComponent,
  },
];

@NgModule({
  declarations: [
    AuthFormComponent,
    LoginRedirectComponent,
    SignupFormComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class AuthModule {}
