import {TestBed} from '@angular/core/testing';

import {CentreFormationService} from '../app/services/centre-formation.service';

describe('EnivronnementUniversitaireService', () => {
    let service: CentreFormationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CentreFormationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
