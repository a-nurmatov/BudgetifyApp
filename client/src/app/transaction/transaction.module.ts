import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionCardComponent } from './components/transaction-card/transaction-card.component';
import { TransactionDialogComponent } from './components/transaction-dialog/transaction-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [TransactionCardComponent, TransactionDialogComponent],
  imports: [CommonModule, SharedModule],
  exports: [TransactionDialogComponent, TransactionCardComponent],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class TransactionModule {}
