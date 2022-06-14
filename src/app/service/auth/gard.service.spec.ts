import { TestBed } from '@angular/core/testing';

import { GardService } from './gard.service';

describe('GardService', () => {
  let service: GardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
