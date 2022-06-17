import { TestBed } from '@angular/core/testing';

import { ApiVehicleService } from './api-vehicle.service';

describe('ApiVehicleService', () => {
  let service: ApiVehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiVehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
