import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription, take } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { AccountInterface } from '../../types/account.interface';
import { DialogueComponent } from '../dialogue/dialogue.component';

@Component({
  selector: 'app-account-card-list',
  templateUrl: './account-card-list.component.html',
  styleUrls: ['./account-card-list.component.scss'],
})
export class AccountCardListComponent implements OnDestroy {
  userAccounts$!: Observable<AccountInterface[]>;
  activeAccount!: AccountInterface;
  activeAccountSubscription!: Subscription;
  faPlus = faPlus;
  @Output() addAccountClicked: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    public dialog: MatDialog,
    private accountService: AccountService
  ) {
    this.getInitialData();
  }

  onClick(account: AccountInterface): void {
    this.accountService.setActiveAccount(account);
  }

  openDialogue(): void {
    let dialogRef = this.dialog.open(DialogueComponent, {
      height: '520px',
      width: '600px',
    });
  }

  cardTrackingFn(index: number, item: AccountInterface): string {
    return item.title;
  }

  getInitialData(): void {
    let userId = localStorage.getItem('userId');
    this.accountService
      .requestUserAccounts(userId)
      .pipe(take(1))
      .subscribe((data) => {
        this.accountService.setInitialData(data.accounts.reverse());
      });
    this.userAccounts$ = this.accountService.getUserAccounts();
    this.activeAccountSubscription = this.accountService
      .getActiveAccount()
      .subscribe((account) => {
        this.activeAccount = account;
      });
  }

  ngOnDestroy(): void {
    this.activeAccountSubscription.unsubscribe();
  }
}
