import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.scss'],
})
export class TransactionDialogComponent implements OnInit {
  faTimes = faTimes;

  transactionForm: FormGroup = new FormGroup({
    type: new FormControl('', [Validators.required]),
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    category: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl('', [Validators.maxLength(256)]),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {}
}
