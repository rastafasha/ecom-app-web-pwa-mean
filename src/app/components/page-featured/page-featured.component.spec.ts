import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFeaturedComponent } from './page-featured.component';

describe('PageFeaturedComponent', () => {
  let component: PageFeaturedComponent;
  let fixture: ComponentFixture<PageFeaturedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageFeaturedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
