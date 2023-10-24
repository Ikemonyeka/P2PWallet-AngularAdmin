import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGLcreateGlComponent } from './new-glcreate-gl.component';

describe('NewGLcreateGlComponent', () => {
  let component: NewGLcreateGlComponent;
  let fixture: ComponentFixture<NewGLcreateGlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewGLcreateGlComponent]
    });
    fixture = TestBed.createComponent(NewGLcreateGlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
