import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycImageUploadedComponent } from './kyc-image-uploaded.component';

describe('KycImageUploadedComponent', () => {
  let component: KycImageUploadedComponent;
  let fixture: ComponentFixture<KycImageUploadedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KycImageUploadedComponent]
    });
    fixture = TestBed.createComponent(KycImageUploadedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
