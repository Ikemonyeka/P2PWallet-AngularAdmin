import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycValidationComponent } from './kyc-validation.component';

describe('KycValidationComponent', () => {
  let component: KycValidationComponent;
  let fixture: ComponentFixture<KycValidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KycValidationComponent]
    });
    fixture = TestBed.createComponent(KycValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
