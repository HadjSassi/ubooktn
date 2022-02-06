import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OneExamenComponent} from '../app/components/exams/one-examen/one-examen.component';

describe('OneExamenComponent', () => {
    let component: OneExamenComponent;
    let fixture: ComponentFixture<OneExamenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OneExamenComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OneExamenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
