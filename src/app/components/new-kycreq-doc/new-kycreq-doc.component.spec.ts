import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewKycreqDocComponent } from './new-kycreq-doc.component';

describe('NewKycreqDocComponent', () => {
  let component: NewKycreqDocComponent;
  let fixture: ComponentFixture<NewKycreqDocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewKycreqDocComponent]
    });
    fixture = TestBed.createComponent(NewKycreqDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
