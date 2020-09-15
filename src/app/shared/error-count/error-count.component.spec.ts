import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorCountComponent } from './error-count.component';

describe('ErrorCountComponent', () => {
  let component: ErrorCountComponent;
  let fixture: ComponentFixture<ErrorCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
