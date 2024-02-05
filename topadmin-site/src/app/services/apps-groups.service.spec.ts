import { TestBed } from '@angular/core/testing';

import { AppsGroupsService } from './apps-groups.service';

describe('AppsGroupsService', () => {
  let service: AppsGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppsGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
