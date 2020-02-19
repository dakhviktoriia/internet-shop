import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceShippingComponent } from './experience-shipping.component';

describe('ExperienceShippingComponent', () => {
  let component: ExperienceShippingComponent;
  let fixture: ComponentFixture<ExperienceShippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceShippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
