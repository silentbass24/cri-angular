/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MedCarService } from './med-car.service';

describe('Service: MedCar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedCarService]
    });
  });

  it('should ...', inject([MedCarService], (service: MedCarService) => {
    expect(service).toBeTruthy();
  }));
});
