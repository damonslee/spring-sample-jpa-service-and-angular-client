import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTableNavigatorComponent } from './ui-table-navigator.component';

describe('UiTableNavigatorComponent', () => {
  let component: UiTableNavigatorComponent;
  let fixture: ComponentFixture<UiTableNavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiTableNavigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiTableNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
