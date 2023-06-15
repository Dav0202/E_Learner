import { TestBed } from '@angular/core/testing';

import { AssignmentResolverService } from './assignment-resolver.service';

describe('AssignmentResolverService', () => {
  let service: AssignmentResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
