import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDirectMessageFooterComponent } from './main-direct-message-footer.component';

describe('MainDirectMessageFooterComponent', () => {
  let component: MainDirectMessageFooterComponent;
  let fixture: ComponentFixture<MainDirectMessageFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDirectMessageFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDirectMessageFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
