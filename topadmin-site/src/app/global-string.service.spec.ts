import { TestBed } from '@angular/core/testing';

import { GlobalStringService } from './global-string.service';

describe('GlobalStringService', () => {
  let service: GlobalStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
