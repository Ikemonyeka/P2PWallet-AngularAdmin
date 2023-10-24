import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayUserProfileComponent } from './display-user-profile.component';

describe('DisplayUserProfileComponent', () => {
  let component: DisplayUserProfileComponent;
  let fixture: ComponentFixture<DisplayUserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayUserProfileComponent]
    });
    fixture = TestBed.createComponent(DisplayUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
