import { TestBed } from '@angular/core/testing';

import { DijkstrasService } from './dijkstras.service';

describe('DijstrasService', () => {
    let service: DijkstrasService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DijkstrasService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
