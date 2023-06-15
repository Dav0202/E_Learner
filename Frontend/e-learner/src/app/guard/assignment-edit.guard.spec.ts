import { TestBed } from '@angular/core/testing';

import { AssignmentEditGuard } from './assignment-edit.guard';

describe('AssignmentEditGuard', () => {
  let guard: AssignmentEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AssignmentEditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
