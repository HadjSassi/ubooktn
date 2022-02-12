import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CentreFormationComponent} from '../app/components/enivronnement-universitaire/centre-formation/centre-formation.component';

describe('CentreFormationComponent', () => {
    let component: CentreFormationComponent;
    let fixture: ComponentFixture<CentreFormationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CentreFormationComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CentreFormationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
