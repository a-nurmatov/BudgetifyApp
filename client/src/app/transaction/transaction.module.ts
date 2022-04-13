import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionCardComponent } from './components/transaction-card/transaction-card.component';
import { TransactionCardListComponent } from './components/transaction-card-list/transaction-card-list.component';
import { TransactionDialogComponent } from './components/transaction-dialog/transaction-dialog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TransactionCardComponent,
    TransactionCardListComponent,
    TransactionDialogComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [TransactionCardListComponent],
})
export class TransactionModule {}
