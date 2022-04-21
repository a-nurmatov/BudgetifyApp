import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { TransactionModule } from '../transaction/transaction.module';
import {
  TransactionDeleteConfirmComponent,
  TransactionDetailComponent,
} from './components/dialog/transaction-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    TransactionDetailComponent,
    TransactionDeleteConfirmComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    TransactionModule,
  ],
})
export class HomeModule {}
