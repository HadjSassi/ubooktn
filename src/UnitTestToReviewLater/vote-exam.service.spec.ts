import {TestBed} from '@angular/core/testing';

import {VoteExamService} from '../app/services/vote-exam.service';

describe('VoteExamService', () => {
    let service: VoteExamService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(VoteExamService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
