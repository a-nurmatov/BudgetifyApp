import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRedirectComponent } from './login-redirect/login-redirect.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: AuthFormComponent,
  },
  {
    path: 'login-redirect',
    component: LoginRedirectComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [AuthFormComponent, LoginRedirectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class AuthModule {}
