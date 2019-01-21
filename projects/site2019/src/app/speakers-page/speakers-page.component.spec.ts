import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakersPageComponent } from './speakers-page.component';

describe('SpeakersPageComponent', () => {
  let component: SpeakersPageComponent;
  let fixture: ComponentFixture<SpeakersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakersPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
