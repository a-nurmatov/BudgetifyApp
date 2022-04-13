import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCardListComponent } from './account-card-list.component';

describe('AccountCardListComponent', () => {
  let component: AccountCardListComponent;
  let fixture: ComponentFixture<AccountCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
