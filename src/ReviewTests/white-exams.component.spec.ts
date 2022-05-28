import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WhiteExamsComponent} from '../app/components/white-exams/white-exams.component';

describe('WhiteExamsComponent', () => {
    let component: WhiteExamsComponent;
    let fixture: ComponentFixture<WhiteExamsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WhiteExamsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WhiteExamsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
