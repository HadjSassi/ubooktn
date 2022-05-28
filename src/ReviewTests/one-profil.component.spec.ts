import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OneProfilComponent} from '../app/components/profils/one-profil/one-profil.component';

describe('OneProfilComponent', () => {
    let component: OneProfilComponent;
    let fixture: ComponentFixture<OneProfilComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OneProfilComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OneProfilComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
