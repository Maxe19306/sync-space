import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberAfterAddChannelComponent } from './add-member-after-add-channel.component';

describe('AddMemberAfterAddChannelComponent', () => {
  let component: AddMemberAfterAddChannelComponent;
  let fixture: ComponentFixture<AddMemberAfterAddChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMemberAfterAddChannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMemberAfterAddChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
