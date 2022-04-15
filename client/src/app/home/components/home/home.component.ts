import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  faArrowDownWideShort,
  faCircleArrowUp,
  faCircleArrowDown,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { TransactionDialogComponent } from 'src/app/transaction/components/transaction-dialog/transaction-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  faArrowDownWideShort = faArrowDownWideShort;
  faCircleArrowUp = faCircleArrowUp;
  faCircleArrowDown = faCircleArrowDown;
  faCirclePlus = faCirclePlus;
  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(TransactionDialogComponent, {
      height: '520px',
      width: '600px',
    });
  }
}
