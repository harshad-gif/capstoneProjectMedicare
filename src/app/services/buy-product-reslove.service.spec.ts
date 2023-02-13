import { TestBed } from '@angular/core/testing';

import { BuyProductResloveService } from './buy-product-reslove.service';

describe('BuyProductResloveService', () => {
  let service: BuyProductResloveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyProductResloveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
