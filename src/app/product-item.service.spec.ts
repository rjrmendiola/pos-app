import { TestBed } from '@angular/core/testing';

import { ProductItemService } from './product-item.service';

describe('ProductItemsService', () => {
  let service: ProductItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
