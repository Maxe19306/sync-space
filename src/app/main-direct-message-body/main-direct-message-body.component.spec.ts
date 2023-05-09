import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDirectMessageBodyComponent } from './main-direct-message-body.component';

describe('MainDirectMessageBodyComponent', () => {
  let component: MainDirectMessageBodyComponent;
  let fixture: ComponentFixture<MainDirectMessageBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDirectMessageBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDirectMessageBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
