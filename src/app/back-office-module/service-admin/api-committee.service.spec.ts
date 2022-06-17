import { TestBed } from '@angular/core/testing';

import { ApiCommitteeService } from './api-committee.service';

describe('ApiCommitteeService', () => {
  let service: ApiCommitteeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCommitteeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
