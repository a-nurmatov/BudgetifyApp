import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCardListComponent } from './transaction-card-list.component';

describe('TransactionCardListComponent', () => {
  let component: TransactionCardListComponent;
  let fixture: ComponentFixture<TransactionCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
