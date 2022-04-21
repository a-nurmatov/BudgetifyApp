import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.scss'],
})
export class UserStatsComponent implements OnInit {
  content: string = `category`;

  constructor() {}

  ngOnInit(): void {}

  onValueChange(value: any) {
    console.log(value);
    this.content = value;
  }
}
