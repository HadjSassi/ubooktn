import {TestBed} from '@angular/core/testing';

import {EventService} from '../app/services/event.service';

describe('EventService', () => {
    let service: EventService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(EventService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
