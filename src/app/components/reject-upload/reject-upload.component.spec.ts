import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectUploadComponent } from './reject-upload.component';

describe('RejectUploadComponent', () => {
  let component: RejectUploadComponent;
  let fixture: ComponentFixture<RejectUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectUploadComponent]
    });
    fixture = TestBed.createComponent(RejectUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
