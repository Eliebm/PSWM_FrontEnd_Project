import { TestBed } from '@angular/core/testing';

import { UserDataBindingService } from './user-data-binding.service';

describe('UserDataBindingService', () => {
  let service: UserDataBindingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataBindingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
