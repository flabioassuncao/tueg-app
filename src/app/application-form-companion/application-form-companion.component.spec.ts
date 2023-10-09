import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationFormCompanionComponent } from './application-form-companion.component';

describe('ApplicationFormCompanionComponent', () => {
  let component: ApplicationFormCompanionComponent;
  let fixture: ComponentFixture<ApplicationFormCompanionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationFormCompanionComponent]
    });
    fixture = TestBed.createComponent(ApplicationFormCompanionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
