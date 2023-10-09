import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationFormV2Component } from './application-form-v2.component';

describe('ApplicationFormV2Component', () => {
  let component: ApplicationFormV2Component;
  let fixture: ComponentFixture<ApplicationFormV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationFormV2Component]
    });
    fixture = TestBed.createComponent(ApplicationFormV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
