import { TestBed } from '@angular/core/testing';

import { TicketCollectionService } from './ticket-collection.service';

describe('TicketCollectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TicketCollectionService = TestBed.get(TicketCollectionService);
    expect(service).toBeTruthy();
  });
});
