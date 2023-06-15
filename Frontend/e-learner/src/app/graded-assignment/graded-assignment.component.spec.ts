import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradedAssignmentComponent } from './graded-assignment.component';

describe('GradedAssignmentComponent', () => {
  let component: GradedAssignmentComponent;
  let fixture: ComponentFixture<GradedAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradedAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradedAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
