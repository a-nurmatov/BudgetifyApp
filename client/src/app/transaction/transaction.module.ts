import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionCardComponent } from './components/transaction-card/transaction-card.component';
import { TransactionDialogComponent } from './components/transaction-dialog/transaction-dialog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TransactionCardComponent, TransactionDialogComponent],
  imports: [CommonModule, SharedModule],
  exports: [TransactionDialogComponent, TransactionCardComponent],
})
export class TransactionModule {}
