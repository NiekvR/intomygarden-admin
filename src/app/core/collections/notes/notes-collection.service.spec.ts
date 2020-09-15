import { TestBed } from '@angular/core/testing';

import { NotesCollectionService } from './notes-collection.service';

describe('NotesCollectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotesCollectionService = TestBed.get(NotesCollectionService);
    expect(service).toBeTruthy();
  });
});
