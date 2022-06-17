import { TestBed } from '@angular/core/testing';

import { ApiChecklistService } from './api-checklist.service';

describe('ApiChecklistService', () => {
  let service: ApiChecklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiChecklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
