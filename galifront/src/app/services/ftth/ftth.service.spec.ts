import { TestBed } from '@angular/core/testing';

import { FTTHService } from './ftth.service';

describe('FtthService', () => {
  let service: FTTHService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FTTHService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
