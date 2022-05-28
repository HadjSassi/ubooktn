import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EnivronnementUniversitaireComponent} from '../app/components/enivronnement-universitaire/enivronnement-universitaire.component';

describe('EnivronnementUniversitaireComponent', () => {
    let component: EnivronnementUniversitaireComponent;
    let fixture: ComponentFixture<EnivronnementUniversitaireComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EnivronnementUniversitaireComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EnivronnementUniversitaireComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
