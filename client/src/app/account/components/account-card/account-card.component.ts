import { Component, Input } from '@angular/core';
import { AccountInterface } from '../../types/account.interface';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent {
  @Input() activeAccount: boolean = false;
  @Input() account!: AccountInterface;
  constructor() {}
}
