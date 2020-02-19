import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencePolicyComponent } from './experience-policy.component';

describe('ExperiencePolicyComponent', () => {
  let component: ExperiencePolicyComponent;
  let fixture: ComponentFixture<ExperiencePolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperiencePolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperiencePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
