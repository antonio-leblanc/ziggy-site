import { TestBed } from '@angular/core/testing';

import { FoodCalcService } from './food-calc.service';

describe('FoodCalcService', () => {
  let service: FoodCalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodCalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
