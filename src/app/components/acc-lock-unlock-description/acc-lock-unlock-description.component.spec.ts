import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccLockUnlockDescriptionComponent } from './acc-lock-unlock-description.component';

describe('AccLockUnlockDescriptionComponent', () => {
  let component: AccLockUnlockDescriptionComponent;
  let fixture: ComponentFixture<AccLockUnlockDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccLockUnlockDescriptionComponent]
    });
    fixture = TestBed.createComponent(AccLockUnlockDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
