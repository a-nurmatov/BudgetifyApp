import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-monthly-stats',
  templateUrl: './monthly-stats.component.html',
  styleUrls: ['./monthly-stats.component.scss'],
})
export class MonthlyStatsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  displayedColumns: string[] = [
    'month',
    'incomes',
    'expenses',
    'savings',
    '% of savings',
  ];
  dataSource = new MatTableDataSource<MonthlyStats>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface MonthlyStats {
  month: string;
  incomes: number;
  expenses: number;
  savings: number;
  percent: number;
}

const ELEMENT_DATA: MonthlyStats[] = [
  {
    month: 'January',
    incomes: 100,
    expenses: 100,
    savings: 100,
    percent: 0.1,
  },
  {
    month: 'February',
    incomes: 100,
    expenses: 100,
    savings: 100,
    percent: 0.1,
  },
];
