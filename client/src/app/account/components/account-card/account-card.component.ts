import { Component, Input } from '@angular/core';
import { AccountInterface } from '../../types/account.interface';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { AccountDetailsComponent } from '../account-details/account-details.component';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent {
  faEye = faEye;
  @Input() activeAccount: boolean = false;
  @Input() account!: AccountInterface;
  constructor(public dialog: MatDialog) {}

  viewDetails(): void {
    this.dialog.open(AccountDetailsComponent, {
      height: '520px',
      width: '600px',
      data: this.account,
    });
  }
}
