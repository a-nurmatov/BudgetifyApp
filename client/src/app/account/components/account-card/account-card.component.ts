import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent implements OnInit {
  @Input() activeAccount = false;
  @Input() title!: string;
  @Input() balance!: number;
  @Input() currency!: string;
  constructor() {}

  ngOnInit(): void {}
}
