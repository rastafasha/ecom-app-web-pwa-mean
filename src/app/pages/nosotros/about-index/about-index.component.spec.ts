import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutIndexComponent } from './about-index.component';

describe('AboutIndexComponent', () => {
  let component: AboutIndexComponent;
  let fixture: ComponentFixture<AboutIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
