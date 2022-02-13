import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OneJourneyComponent} from '../app/components/events/one-journey/one-journey.component';

describe('OneJourneyComponent', () => {
    let component: OneJourneyComponent;
    let fixture: ComponentFixture<OneJourneyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OneJourneyComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OneJourneyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
