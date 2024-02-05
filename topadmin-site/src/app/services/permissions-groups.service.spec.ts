import { TestBed } from '@angular/core/testing';

import { PermissionsGroupsService } from './permissions-groups.service';

describe('PermissionsGroupsService', () => {
  let service: PermissionsGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionsGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
