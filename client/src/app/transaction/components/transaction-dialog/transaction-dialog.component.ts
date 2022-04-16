import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, Subscription, take } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CategoryService } from 'src/app/category/services/category.service';
import { CategoryInterface } from 'src/app/category/types/category.interface';
import {
  faCircleArrowDown,
  faCircleArrowUp,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.scss'],
})
export class TransactionDialogComponent implements OnInit, OnDestroy {
  faTimes = faTimes;
  faCircleArrowDown = faCircleArrowDown;
  faCircleArrowUp = faCircleArrowUp;

  filterState: string = 'income';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryCtrl = new FormControl('', [Validators.required]);
  filteredCategories!: string[];
  categories: string[] = [];
  allCategories: string[] = [];
  categoriesData!: CategoryInterface[];
  categoriesDataSubscription!: Subscription;

  transactionForm: FormGroup = new FormGroup({
    // type: new FormControl('', [Validators.required]),
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    amount: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.maxLength(256)]),
  });

  constructor(private categoryService: CategoryService) {
    this.categoryCtrl.valueChanges.subscribe((value) => {
      if (value) {
        this.filteredCategories = this.allCategories.filter((category) => {
          return category.toLowerCase().includes(value.toLowerCase());
        });
      } else {
        this.filteredCategories = this.allCategories;
      }
    });
    this.setValues();
  }

  ngOnInit(): void {
    this.isDateValid();
  }

  ngOnDestroy(): void {
    this.categoriesDataSubscription.unsubscribe();
  }

  setIncomeFilter() {
    this.categories = [];
    this.filteredCategories = [];
    this.filterState = 'income';
    this.filterCategories(this.filterState);
  }

  setExpenseFilter() {
    this.categories = [];
    this.filteredCategories = [];
    this.filterState = 'expense';
    this.filterCategories(this.filterState);
  }

  filterCategories(state: string) {
    this.allCategories = this.categoriesData
      .filter((category) => category.type === state)
      .map((category) => {
        return (
          category.title?.slice(0, 1).toUpperCase() + category.title.slice(1)
        );
      });
  }

  setValues() {
    let userId = localStorage.getItem('userId');
    this.categoryService
      .requestUserCategories(userId)
      .pipe(take(1))
      .subscribe((data) => {
        this.categoryService.setInitialData(data.categories);
      });

    this.categoriesDataSubscription = this.categoryService
      .getUserCategories()
      .subscribe((data) => {
        this.categoriesData = data;
        this.filterCategories(this.filterState);
      });
  }

  onSubmit(): void {
    console.log(this.transactionForm.value);
    console.log(this.categories);
  }

  isDateValid() {
    this.transactionForm.get('date')!.valueChanges.subscribe((value) => {
      let today: Date = new Date();

      if (new Date(value) > today) {
        this.transactionForm.get('date')!.setErrors({ futureDate: true });
      }

      return null;
    });
  }

  getTypeError() {
    return this.transactionForm.get('type')!.errors?.['required']
      ? 'You must enter a type'
      : '';
  }

  getTitleError() {
    return this.transactionForm.get('title')!.errors?.['required']
      ? 'Title is required'
      : this.transactionForm.get('title')!.errors?.['maxlength']
      ? 'Max length is 128'
      : this.transactionForm.get('title')!.errors?.['pattern']
      ? 'Only letters and numbers are allowed'
      : '';
  }

  getAmountError() {
    return this.transactionForm.get('amount')!.errors?.['required']
      ? 'Amount is required'
      : '';
  }

  getDateError() {
    return this.transactionForm.get('date')!.errors?.['required']
      ? 'Date is required'
      : this.transactionForm.get('date')!.errors?.['futureDate']
      ? 'Future date is not allowed'
      : '';
  }

  getDescriptionError() {
    return this.transactionForm.get('description')!.errors?.['maxlength']
      ? 'Max length is 256'
      : '';
  }

  @ViewChild('categoryInput') categoryInput!: ElementRef<HTMLInputElement>;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our category
    if ((value || '').trim().toLowerCase()) {
      if (!this.categories.includes(value.trim().toLowerCase())) {
        this.categories.push(value.trim().toLocaleLowerCase());
      }
    }

    // Clear the input value
    event.chipInput!.clear();

    this.categoryCtrl.setValue(null);
  }

  remove(category: string): void {
    const index = this.categories.indexOf(category);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if ((event.option.viewValue || '').trim()) {
      if (
        !this.categories.includes(event.option.viewValue.trim().toLowerCase())
      ) {
        this.categories.push(event.option.viewValue.trim().toLowerCase());
      }
    }

    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCategories.filter((category) =>
      category.toLowerCase().includes(filterValue)
    );
  }
}
