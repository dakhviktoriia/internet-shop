import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumBlog3Component } from './forum-blog3.component';

describe('ForumBlog3Component', () => {
  let component: ForumBlog3Component;
  let fixture: ComponentFixture<ForumBlog3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumBlog3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumBlog3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
