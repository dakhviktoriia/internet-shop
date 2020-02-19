import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSizesComponent } from './admin-sizes.component';

describe('AdminSizesComponent', () => {
  let component: AdminSizesComponent;
  let fixture: ComponentFixture<AdminSizesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSizesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
