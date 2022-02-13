import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OneCompetitionComponent} from '../app/components/events/one-competition/one-competition.component';

describe('OneCompetitionComponent', () => {
    let component: OneCompetitionComponent;
    let fixture: ComponentFixture<OneCompetitionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OneCompetitionComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OneCompetitionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
