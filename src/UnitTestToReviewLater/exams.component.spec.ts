import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExamsComponent} from '../app/components/exams/exams.component';

describe('ExamsComponent', () => {
    let component: ExamsComponent;
    let fixture: ComponentFixture<ExamsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ExamsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ExamsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
