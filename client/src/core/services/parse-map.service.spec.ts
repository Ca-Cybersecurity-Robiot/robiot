import { TestBed } from '@angular/core/testing';

import { ParseMapService } from './parse-map.service';

describe('ParseMapService', () => {
  let service: ParseMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParseMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
