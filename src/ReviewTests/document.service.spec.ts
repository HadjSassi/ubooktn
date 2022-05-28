import {TestBed} from '@angular/core/testing';

import {DocumentService} from '../app/services/document.service';

describe('DocumentService', () => {
    let service: DocumentService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DocumentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
