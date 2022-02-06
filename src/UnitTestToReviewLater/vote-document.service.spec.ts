import {TestBed} from '@angular/core/testing';

import {VoteDocumentService} from '../app/services/vote-document.service';

describe('VoteDocumentService', () => {
    let service: VoteDocumentService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(VoteDocumentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
