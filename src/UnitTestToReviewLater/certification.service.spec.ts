import {TestBed} from '@angular/core/testing';

import {CertificationService} from '../app/services/certification.service';

describe('CertificationService', () => {
    let service: CertificationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CertificationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
