import {TestBed} from '@angular/core/testing';

import {ExamenService} from '../app/services/examen.service';

describe('ExamenService', () => {
    let service: ExamenService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ExamenService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
