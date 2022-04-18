import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.scss'],
})
export class ExpenseTableComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  displayedColumns: string[] = ['category', 'amount', '% in total'];
  dataSource = new MatTableDataSource<CategoryData>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface CategoryData {
  category: string;
  amount: number;
  percent: number;
}

const ELEMENT_DATA: CategoryData[] = [
  {
    category: 'Food',
    amount: 100,
    percent: 0.1,
  },
  {
    category: 'Transport',
    amount: 100,
    percent: 0.1,
  },
];
