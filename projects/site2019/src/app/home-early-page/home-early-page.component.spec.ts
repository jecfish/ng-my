import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEarlyPageComponent } from './home-early-page.component';

describe('HomeEarlyPageComponent', () => {
  let component: HomeEarlyPageComponent;
  let fixture: ComponentFixture<HomeEarlyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEarlyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEarlyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
