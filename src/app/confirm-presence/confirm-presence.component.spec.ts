import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPresenceComponent } from './confirm-presence.component';

describe('ConfirmPresenceComponent', () => {
  let component: ConfirmPresenceComponent;
  let fixture: ComponentFixture<ConfirmPresenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmPresenceComponent]
    });
    fixture = TestBed.createComponent(ConfirmPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
