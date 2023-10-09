import { TestBed } from '@angular/core/testing';

import { GiraService } from './gira.service';

describe('GiraService', () => {
  let service: GiraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
