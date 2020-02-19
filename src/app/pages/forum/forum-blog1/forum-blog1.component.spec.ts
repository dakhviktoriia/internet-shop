import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumBlog1Component } from './forum-blog1.component';

describe('ForumBlog1Component', () => {
  let component: ForumBlog1Component;
  let fixture: ComponentFixture<ForumBlog1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumBlog1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumBlog1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
