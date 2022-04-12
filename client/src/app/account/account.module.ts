import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountCardComponent } from './components/account-card/account-card.component';
import { AccountCardListComponent } from './components/account-card-list/account-card-list.component';
import { SharedModule } from '../shared/shared.module';
import { DialogueComponent } from './components/dialogue/dialogue.component';

@NgModule({
  declarations: [
    AccountCardComponent,
    AccountCardListComponent,
    DialogueComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [AccountCardComponent, AccountCardListComponent],
})
export class AccountModule {}