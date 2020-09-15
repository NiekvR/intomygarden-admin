import { TestBed } from '@angular/core/testing';

import { ErrorCollectionService } from './error-collection.service';

describe('ErrorCollectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorCollectionService = TestBed.get(ErrorCollectionService);
    expect(service).toBeTruthy();
  });
});
