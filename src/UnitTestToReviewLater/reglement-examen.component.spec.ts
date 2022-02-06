import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReglementExamenComponent} from '../app/components/exams/reglement-examen/reglement-examen.component';

describe('ReglementExamenComponent', () => {
    let component: ReglementExamenComponent;
    let fixture: ComponentFixture<ReglementExamenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ReglementExamenComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ReglementExamenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
