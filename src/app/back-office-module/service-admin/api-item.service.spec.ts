import { TestBed } from '@angular/core/testing';

import { ApiItemService } from './api-item.service';

describe('ApiItemService', () => {
  let service: ApiItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
