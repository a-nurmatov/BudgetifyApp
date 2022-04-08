import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DialogueComponent } from '../dialogue/dialogue.component';

@Component({
  selector: 'app-account-card-list',
  templateUrl: './account-card-list.component.html',
  styleUrls: ['./account-card-list.component.scss'],
})
export class AccountCardListComponent implements OnInit {
  faPlus = faPlus;
  @Output() addAccountClicked: EventEmitter<void> = new EventEmitter<void>();
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  onClick(): void {
    this.addAccountClicked.emit();
  }

  openDialogue(): void {
    let dialogRef = this.dialog.open(DialogueComponent, {
      height: '520px',
      width: '600px',
    });
  }
}
