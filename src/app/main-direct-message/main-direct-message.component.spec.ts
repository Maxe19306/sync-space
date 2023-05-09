import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDirectMessageComponent } from './main-direct-message.component';

describe('MainDirectMessageComponent', () => {
  let component: MainDirectMessageComponent;
  let fixture: ComponentFixture<MainDirectMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDirectMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDirectMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
