import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderPageComponent } from './placeholder-page.component';

describe('PlaceholderPageComponent', () => {
  let component: PlaceholderPageComponent;
  let fixture: ComponentFixture<PlaceholderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceholderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceholderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
