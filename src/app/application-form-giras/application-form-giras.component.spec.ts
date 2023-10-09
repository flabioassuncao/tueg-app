import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationFormGirasComponent } from './application-form-giras.component';

describe('ApplicationFormGirasComponent', () => {
  let component: ApplicationFormGirasComponent;
  let fixture: ComponentFixture<ApplicationFormGirasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationFormGirasComponent]
    });
    fixture = TestBed.createComponent(ApplicationFormGirasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
