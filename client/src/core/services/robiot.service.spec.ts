import { TestBed } from '@angular/core/testing';

import { RobiotService } from './robiot.service';

describe('RobiotService', () => {
    let service: RobiotService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RobiotService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
