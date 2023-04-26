import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryChatFooterComponent } from './secondary-chat-footer.component';

describe('SecondaryChatFooterComponent', () => {
  let component: SecondaryChatFooterComponent;
  let fixture: ComponentFixture<SecondaryChatFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondaryChatFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondaryChatFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
