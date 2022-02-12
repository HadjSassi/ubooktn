import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
    OneCentreFormationComponent
} from '../app/components/enivronnement-universitaire/one-centre-formation/one-centre-formation.component';

describe('OneCentreFormationComponent', () => {
    let component: OneCentreFormationComponent;
    let fixture: ComponentFixture<OneCentreFormationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OneCentreFormationComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OneCentreFormationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
