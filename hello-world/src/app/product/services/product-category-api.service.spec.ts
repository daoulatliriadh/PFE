import { TestBed } from '@angular/core/testing';

import { ProductCategoryAPIService } from './product-category-api.service';

describe('ProductCategoryAPIService', () => {
  let service: ProductCategoryAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCategoryAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
