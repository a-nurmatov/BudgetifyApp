import { Component, OnInit } from '@angular/core';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
})
export class TransactionCardComponent implements OnInit {
  faCircleArrowUP = faCircleArrowUp;
  constructor() {}

  ngOnInit(): void {}
}
