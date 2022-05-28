import {TestBed} from '@angular/core/testing';

import {InstitusService} from '../app/services/institus.service';

describe('InstitusService', () => {
    let service: InstitusService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(InstitusService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
