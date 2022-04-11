import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { AccountInterface } from '../../types/account.interface';
import { DialogueComponent } from '../dialogue/dialogue.component';

@Component({
  selector: 'app-account-card-list',
  templateUrl: './account-card-list.component.html',
  styleUrls: ['./account-card-list.component.scss'],
})
export class AccountCardListComponent implements OnInit {
  userAccounts$: Observable<AccountInterface[]>;
  faPlus = faPlus;
  @Output() addAccountClicked: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    public dialog: MatDialog,
    private accountService: AccountService
  ) {
    this.sendRequestToAccounts();
    this.userAccounts$ = this.accountService.getUserAccounts();
  }

  ngOnInit(): void {}

  onClick(): void {
    this.addAccountClicked.emit();
  }

  openDialogue(): void {
    let dialogRef = this.dialog.open(DialogueComponent, {
      height: '520px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  sendRequestToAccounts(): void {
    let userId = localStorage.getItem('userId');
    if (userId) {
      this.accountService.requestUserAccounts(userId);
    }
  }

  cardTrackingFn(index: number, item: AccountInterface) {
    return item._id;
  }
}
