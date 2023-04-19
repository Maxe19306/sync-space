import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainChatFooterComponent } from './main-chat-footer.component';

describe('MainChatFooterComponent', () => {
  let component: MainChatFooterComponent;
  let fixture: ComponentFixture<MainChatFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainChatFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainChatFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
