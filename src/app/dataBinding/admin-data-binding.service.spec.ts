import { TestBed } from '@angular/core/testing';

import { AdminDataBindingService } from './admin-data-binding.service';

describe('AdminDataBindingService', () => {
  let service: AdminDataBindingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDataBindingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
