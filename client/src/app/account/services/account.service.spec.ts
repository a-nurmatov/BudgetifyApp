import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AccountService } from './account.service';
import { AccountInterface } from '../types/account.interface';

describe('AccountService', () => {
  let service: AccountService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(AccountService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return new account data with succes message', (done: DoneFn) => {
    let expectedResult: { message: string; newAccount: AccountInterface } = {
      message: 'success',
      newAccount: {
        _id: '1',
        title: 'title',
        currency: 'currency',
        description: 'description',
        balance: 0,
        userId: 'userId',
        uniqueness: 'userIdtitle',
      },
    };

    service
      .addNewAccount('name', 'type', 'userId', 'uniqueness')
      .subscribe((res) => {
        expect(res).toEqual(expectedResult);
        done();
      });

    const req = httpController.expectOne('http://localhost:5000/accounts');
    expect(req.request.method).toBe('POST');
    req.flush(expectedResult);
  });

  it('should return success message after account deletion', (done: DoneFn) => {
    let expectedResult = { message: 'success' };

    service.deleteAccount('1').subscribe((res) => {
      expect(res).toEqual(expectedResult);
      done();
    });

    const req = httpController.expectOne('http://localhost:5000/accounts/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(expectedResult);
  });

  it('should return success message and updated account after account update', (done: DoneFn) => {
    let expectedResult = {
      message: 'success',
      updatedAccount: {
        _id: '1',
        title: 'title',
        currency: 'currency',
        description: 'description',
        balance: 0,
        userId: 'userId',
        uniqueness: 'userIdtitle',
      },
    };

    service
      .updateAccount({
        _id: '1',
        title: 'title',
        currency: 'currency',
        description: 'description',
        balance: 0,
        userId: 'userId',
        uniqueness: 'userIdtitle',
      })
      .subscribe((res) => {
        expect(res).toEqual(expectedResult);
        done();
      });

    const req = httpController.expectOne('http://localhost:5000/accounts/1');
    expect(req.request.method).toBe('PATCH');
    req.flush(expectedResult);
  });
});
