import {TestBed} from '@angular/core/testing';

import {CommentExamService} from '../app/services/comment-exam.service';

describe('CommentExamService', () => {
    let service: CommentExamService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CommentExamService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
