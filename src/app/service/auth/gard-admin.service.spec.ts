import { TestBed } from '@angular/core/testing';

import { GardAdminService } from './gard-admin.service';

describe('GardAdminService', () => {
  let service: GardAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GardAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
