import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user data', (done: DoneFn) => {
    const expectedResult = {
      message: 'success',
      user: {
        id: '1',
        email: 'email',
        token: 'token',
        expiresIn: 3600,
        country: 'country',
        userId: 'userId',
        fullName: 'fullName',
      },
    };

    service.login('email', 'password').subscribe((res) => {
      expect(res).toEqual(expectedResult);
      done();
    });

    const req = httpController.expectOne('http://localhost:5000/users/login');
    expect(req.request.method).toBe('POST');
    req.flush(expectedResult);
  });

  it('setSession have to be called on success', (done: DoneFn) => {
    spyOn(service as any, 'setSession');
    const expectedResult = {
      message: 'success',
      user: {
        id: '1',
        email: 'email',
        token: 'token',
        expiresIn: 3600,
        country: 'country',
        userId: 'userId',
        fullName: 'fullName',
      },
    };

    service.login('email', 'password').subscribe(() => {
      expect((service as any).setSession).toHaveBeenCalledWith(expectedResult);
      done();
    });

    const req = httpController.expectOne({
      url: 'http://localhost:5000/users/login',
      method: 'POST',
    });
    req.flush(expectedResult);
  });

  it('setSession have not to be called on error', (done: DoneFn) => {
    spyOn(service as any, 'setSession');

    service.login('email', 'password').subscribe({
      error: () => {
        expect((service as any).setSession).not.toHaveBeenCalled();
        done();
      },
    });

    const req = httpController.expectOne({
      url: 'http://localhost:5000/users/login',
      method: 'POST',
    });
    req.error(new ProgressEvent('401'));
  });
});
