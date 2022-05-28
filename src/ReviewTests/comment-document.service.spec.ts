import {TestBed} from '@angular/core/testing';

import {CommentDocumentService} from '../app/services/comment-document.service';

describe('CommentDocumentService', () => {
    let service: CommentDocumentService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CommentDocumentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
