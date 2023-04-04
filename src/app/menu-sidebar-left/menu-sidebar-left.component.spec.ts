import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSidebarLeftComponent } from './menu-sidebar-left.component';

describe('MenuSidebarLeftComponent', () => {
  let component: MenuSidebarLeftComponent;
  let fixture: ComponentFixture<MenuSidebarLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSidebarLeftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSidebarLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
