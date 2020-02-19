import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumBlog2Component } from './forum-blog2.component';

describe('ForumBlog2Component', () => {
  let component: ForumBlog2Component;
  let fixture: ComponentFixture<ForumBlog2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumBlog2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumBlog2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
