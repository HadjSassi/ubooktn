import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OneCertificationComponent} from '../app/components/events/one-certification/one-certification.component';

describe('OneCertificationComponent', () => {
    let component: OneCertificationComponent;
    let fixture: ComponentFixture<OneCertificationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OneCertificationComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OneCertificationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
