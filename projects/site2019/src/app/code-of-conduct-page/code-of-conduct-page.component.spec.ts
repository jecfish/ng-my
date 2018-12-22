import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeOfConductPageComponent } from './code-of-conduct-page.component';

describe('CodeOfConductPageComponent', () => {
  let component: CodeOfConductPageComponent;
  let fixture: ComponentFixture<CodeOfConductPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeOfConductPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeOfConductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
