import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryChatBodyComponent } from './secondary-chat-body.component';

describe('SecondaryChatBodyComponent', () => {
  let component: SecondaryChatBodyComponent;
  let fixture: ComponentFixture<SecondaryChatBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecondaryChatBodyComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SecondaryChatBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
