import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountCardListComponent } from './components/account-card-list/account-card-list.component';
import { SharedModule } from '../shared/shared.module';
import { DialogueComponent } from './components/dialogue/dialogue.component';
import { AccountCardComponent } from './components/account-card/account-card.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { AccountDeleteConfirmComponent } from './components/account-delete-confirm/account-delete-confirm.component';

@NgModule({
  declarations: [
    AccountCardComponent,
    AccountCardListComponent,
    AccountDetailsComponent,
    DialogueComponent,
    AccountDeleteConfirmComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [AccountCardComponent, AccountCardListComponent],
})
export class AccountModule {}
