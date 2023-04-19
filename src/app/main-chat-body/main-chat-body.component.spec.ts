import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainChatBodyComponent } from './main-chat-body.component';

describe('MainChatBodyComponent', () => {
  let component: MainChatBodyComponent;
  let fixture: ComponentFixture<MainChatBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainChatBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainChatBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
