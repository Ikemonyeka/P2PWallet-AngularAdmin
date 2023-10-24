import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesfullyDisabledComponent } from './succesfully-disabled.component';

describe('SuccesfullyDisabledComponent', () => {
  let component: SuccesfullyDisabledComponent;
  let fixture: ComponentFixture<SuccesfullyDisabledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccesfullyDisabledComponent]
    });
    fixture = TestBed.createComponent(SuccesfullyDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
