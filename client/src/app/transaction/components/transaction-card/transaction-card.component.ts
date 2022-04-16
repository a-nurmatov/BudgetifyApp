import { Component, Input, OnInit } from '@angular/core';
import {
  faCircleArrowUp,
  faCircleArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import { pipe, take } from 'rxjs';
import { AccountService } from 'src/app/account/services/account.service';
import { AccountInterface } from 'src/app/account/types/account.interface';
import { CategoryInterface } from 'src/app/category/types/category.interface';
import { TransactionInterface } from '../../types/transaction.interface';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
})
export class TransactionCardComponent implements OnInit {
  faCircleArrowUP = faCircleArrowUp;
  faCircleArrowDown = faCircleArrowDown;
  @Input() transaction!: TransactionInterface;
  type!: string;
  activeAccount!: AccountInterface;
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService
      .getActiveAccount()
      .pipe(take(1))
      .subscribe((account) => {
        this.activeAccount = account;
      });
    this.type = this.transaction.type;
  }
}
