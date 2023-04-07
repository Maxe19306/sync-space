import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirnNewPasswordComponent } from './confirn-new-password.component';

describe('ConfirnNewPasswordComponent', () => {
  let component: ConfirnNewPasswordComponent;
  let fixture: ComponentFixture<ConfirnNewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirnNewPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirnNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
