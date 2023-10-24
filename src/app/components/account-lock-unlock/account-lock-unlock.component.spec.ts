import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLockUnlockComponent } from './account-lock-unlock.component';

describe('AccountLockUnlockComponent', () => {
  let component: AccountLockUnlockComponent;
  let fixture: ComponentFixture<AccountLockUnlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountLockUnlockComponent]
    });
    fixture = TestBed.createComponent(AccountLockUnlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
